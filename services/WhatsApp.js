const axios = require("axios");

const sendMsg = async () => {
  const data = {
    phone: "+917388435580",
    media: {
      type: "media_template",
      template_name: "solar_electricity",
      lang_code: "en",
      body: [
        {
          text: "Shivam",
        },
        {
          text: "Virtual Wardrobe",
        },
        {
          text: "+917398904791",
        },
        {
          text: "2019005@iiitdmj.ac.in",
        },
      ],
    },
  };
  const options = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "617bf1a7245383001100f7c2"
    }
  }
  const res = await axios.post(
    "https://rapidapi.rmlconnect.net/wbm/v1/message",
    data,
    options
  );
  console.log(res.data);
};

sendMsg();