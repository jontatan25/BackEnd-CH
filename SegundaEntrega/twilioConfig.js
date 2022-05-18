const twilio = require("twilio");

const accountSid = "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
const authToken = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

const client = twilio(accountSid, authToken);

const optionsSMS = {
  body: "Hola soy un SMS desde Node.js!",
  from: "+14156884237",
  to: "+541100000000",
};

const optionswsp = {
  body: "Hola soy un WSP desde Node.js!",
  // mediaUrl: [ 'https://www.investingmoney.biz/public/img/art/xl/18012019161021Twilio-IoT.jpg' ],
  from: "whatsapp:+14155238886",
  to: "whatsapp:+5491100000000",
};

module.exports = {
  sendSMS: (info) => {
    // try {
    //     const message = await client.messages.create(optionsSMS)
    //     console.log(message)
    // } catch (error) {
    //     console.log(error)
    // }
    console.log(`Enviando SMS a ${optionsSMS.to}`+'\n'+ JSON.stringify(info, null, "\t"));
  },

  sendWSP: (info) => {
    // try {
    //     const message = await client.messages.create(optionswsp)
    //     console.log(message)
    // } catch (error) {
    //     console.log(error)
    // }
    console.log(`Enviando Mensaje de whatsapp a ${info.telefono}`+ '\n'+ "Su pedido ha sido recibido y se encuentra en proceso");
  },
};
