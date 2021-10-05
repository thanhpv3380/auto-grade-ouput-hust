import { Builder, By, Key } from "selenium-webdriver";
import dotenv from "dotenv";

dotenv.config();

// EMAIL: là mã số sinh viên
// PASSWORD: là mật khẩu

// 1. TIMETABLE: xem thời khóa biểu
// 2. GRADE_TERM: xem điểm kì mới nhất
// 3. COURSE_MARKS: xem bảng điểm cá nhân
// 4. COURSE_GRADE: xem bảng điểm học phần
// 5. TUITION: xem học phí

async function init({ email, password }) {
  let courseMarks = [];
  let driver = await new Builder().forBrowser("MicrosoftEdge").build();
  try {
    await driver.get("https://ctt-sis.hust.edu.vn/Account/Login.aspx");

    // type email/mssv
    await driver
      .findElement(
        By.id("ctl00_ctl00_contentPane_MainPanel_MainContent_tbUserName_I")
      )
      .sendKeys(email, Key.TAB, password);
    // wait 8s to type captcha
    await driver.sleep(5000);

    // click login
    await driver
      .findElement(
        By.id("ctl00_ctl00_contentPane_MainPanel_MainContent_btLogin")
      )
      .click();

    // access course marks
    await driver.get(
      "https://ctt-sis.hust.edu.vn/Students/StudentCourseMarks.aspx"
    );

    // wait 1s to change redirect
    await driver.sleep(5000);

    // get header title
    const headerTableGrade = await driver.findElement(
      By.id(
        "ctl00_ctl00_contentPane_MainPanel_MainContent_gvCourseMarks_DXHeadersRow0"
      )
    );
    const headerColsEle = await headerTableGrade.findElements(
      By.className("dxgvHeader")
    );
    let headerData = [];

    for (let i = 0; i < headerColsEle.length - 1; i++) {
      const cols = await headerColsEle[i].findElements(
        By.css("table tbody tr td")
      );
      const text = await cols[0].getText();
      headerData.push(text);
    }

    // get content
    const tableGrade = await driver.findElement(
      By.id(
        "ctl00_ctl00_contentPane_MainPanel_MainContent_gvCourseMarks_DXMainTable"
      )
    );

    await driver.sleep(1000);
    const rowsEle = await tableGrade.findElements(By.className("dxgvDataRow"));
    const rowTemplate =
      "ctl00_ctl00_contentPane_MainPanel_MainContent_gvCourseMarks_DXDataRow";

    for (let i = 0; i < rowsEle.length; i++) {
      const row = await tableGrade.findElement(By.id(`${rowTemplate}${i}`));
      const cols = await row.findElements(By.className("dx-nowrap"));
      let rowData = {};
      for (let i = 0; i < cols.length; i++) {
        const text = await cols[i].getText();
        rowData[headerData[i]] = text;
      }
      courseMarks.push(rowData);
    }
    console.table(courseMarks, headerData);
  } catch (error) {
    console.log(error);
  }
}

const { EMAIL, PASSWORD } = process.env;
init({ email: EMAIL, password: PASSWORD });
