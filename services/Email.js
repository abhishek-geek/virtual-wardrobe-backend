const axios = require("axios")

const newSMTPUser = async () => {
  const data = {
    owner_id: "54741945",
    token: "EzSmvGIGD3eYSk0Sbo1skg61",
    total_limit: 1000,
    hourly_limit: 100,
  }
  const res = await axios.post("https://rapidemail.rmlconnect.net/v1.0/settings/addSmtp", data);
  console.log(res.data);
  if(res.data.status === "success") {
    const user = {
      smtp_user_name: res.data.smtp_user_name,
      smtp_password: res.data.smtp_password,
    }
    console.log(user);
  }
}

const sendEmail = async (html, to, name, subject) => {
  const data = {
    owner_id: "54741945",
    token: "EzSmvGIGD3eYSk0Sbo1skg61",
    smtp_user_name: "smtp54265967",
    message: {
      html: html,
      text: "Example text content",
      subject,
      from_email: "noreply@rapidemail.rmlconnect.net",
      from_name: "Rapid Fire",
      to: [
        {
          email: to,
          name: name || "",
          type: "to"
        }
      ]
  }
  
  }
  const res = await axios.post("https://rapidemail.rmlconnect.net/v1.0/messages/sendMail", data);
  console.log(res.data);
  if(res.data.status === "queued") {
    console.log("done");
  }
}
// newSMTPUser();
sendEmail("<h4>hi</h4>", "2019005@iiitdmj.ac.in", "Abhishek Dubey", "Test Subject");