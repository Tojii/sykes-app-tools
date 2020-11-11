import Mock from "../mock";
import shortId from "shortid";

const rembolsoDB = {
    list: [
      {
        id: shortId.generate(),
        categoria: "Message",
        curso: 'test1',
        estado: 'Estado 1',
        montoAPagar:"1000",
        fechaSolicitud:"11/09/2020",
        deposito:"12/09/2020"
      },
      {
        id: shortId.generate(),
        categoria: "Message",
        curso: 'test 2',
        estado: 'Estado 2',
        montoAPagar:"1000",
        fechaSolicitud:"11/09/2020",
        deposito:"12/09/2020"
      },
      {
        id: shortId.generate(),
        categoria: "Message",
        curso: 'test 2',
        estado: 'Estado 2',
        montoAPagar:"1000",
        fechaSolicitud:"11/09/2020",
        deposito:"12/09/2020"
      },
    ]
  };

  Mock.onGet("/api/reembolsoEducativo").reply(config => {
    const response = rembolsoDB.list;
    return [200, response];
  });

  Mock.onPost("/api/reembolsoEducativo/add").reply(config => {
    const response = rembolsoDB.list;
    return [200, response];
  });

  Mock.onPost("/api/reembolsoEducativo/delete").reply(config => {
    let { id } = JSON.parse(config.data);
    console.log(id);
  
    const response = rembolsoDB.list.filter(
      re => re.id !== id
    );
    rembolsoDB.list = [...response];
    return [200, response];
  });
  
  