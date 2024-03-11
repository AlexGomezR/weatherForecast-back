import modelData from "../db/dataModel.js";

const controller = {};

controller.getData = async (req, res) => {
  try {
    const latitude = req.params.latitude;
    const longitude = req.params.longitude;
    const threeHoursBefore = new Date(Date.now() - 3 * 60 * 60 * 1000);
    const now = new Date();
    //Se podría crear una función que, recibiendo los parámetros de latitud y longitud, te devolviera la información si existe en la base de datos y elimine en caso de que sea antigua
    let data = await modelData.findOne({
      "message.lat": Number(latitude),
      "message.lon": Number(longitude),
    });
    if (data && data.time <= threeHoursBefore) {
      await modelData.deleteOne({ _id: data.id });
      data = null;
    }

    if (!data) {
      const api_key = process.env.API_KEY;
      const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,current&appid=${api_key}`;
      const response = await fetch(apiUrl);
      const dataApi = await response.json();

      if (response.status === 200) {
        const newData = new modelData({
          time: now,
          message: dataApi,
        });
        await newData.save();
        data = newData;
      } else {
        return res.status(400).send();
      }
    }

    const hourly = data.message.hourly;
    const daily = data.message.daily;
    const sendData = {
      hourly: hourly,
      daily: daily,
    };

    res.status(200).send(sendData);
  } catch (error) {
    console.error("Error en el controlador getData:", error);
    res.status(500).send();
  }
};

controller.getDataHours = async (req, res) => {
  try {
    const hours = parseInt(req.params.hours);
    const latitude = parseInt(req.params.latitude);
    const longitude = parseInt(req.params.longitude);

    const api_key = process.env.API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${api_key}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    let sendData = undefined;
    let check = 0;
    if (response.status === 200) {
      let i = 0;
      let ts;
      let date;
      let tsHour;
      do {
        ts = data.list[i].dt * 1000;
        date = new Date(ts);
        tsHour = date.getHours();
        if (tsHour === hours) {
          sendData = data.list[i];
          check = 1;
          break;
        }
        i++;
      } while (i < data.list.length);
      if (check === 1) {
        res.status(200).send(sendData);
      } else {
        return res.status(204).send();
      }
    } else {
      return res.status(400).send();
    }
  } catch (error) {
    console.error("Error en el controlador getDataHours:", error);
    res.status(500).send();
  }
};

export default controller;
