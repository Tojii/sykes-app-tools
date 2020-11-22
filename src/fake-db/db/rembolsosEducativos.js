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


  const CategoriaDeEstudioDB = {
    list: [
      {
        id: 1,
        item: "Estudios Universitarios" 
      },
      {
        id: 2,
        item: "Certificación" 
      },
      {
        id: 3,
        item: "CISCO" 
      },
      {
        id: 4,
        item: "Idiomas" 
      },
      {
        id: 5,
        item: "Estudios Técnicos" 
      },
      {
        id: 6,
        item: "La Fod" 
      },
      {
        id: 7,
        item: "Otros" 
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

    const response = rembolsoDB.list.filter(
      re => re.id !== id
    );
    rembolsoDB.list = [...response];
    return [200, response];
  });
  
  Mock.onGet("/api/CategoriaDeEstudio").reply(config => {
    const response = CategoriaDeEstudioDB.list;
    return [200, response];
  });
  