import Mock from "../mock";
import shortId from "shortid";

const LikeDislikesDB = {
    list: [
      {
        id: shortId.generate(),
        component: "REEMBOLSOEDUCATIVO",
        userId: "22590",
        vote: 1
      },
      {
        id: shortId.generate(),
        component: "VENTASHOME",
        userId: "22590",
        vote: 1
      },
      {
        id: shortId.generate(),
        component: "VENTAS",
        userId: "22590",
        vote: 1
      }
    ]
  };

  Mock.onGet("/api/getLikesDislikes").reply(config => {
    let uid = config.data;
    let response = [];
    if (uid) {
      response = getLikesDislikes(uid);
    }
  
    return [200, response];
  });

  const getLikesDislikes = uid => {
    let list = LikeDislikesDB.list.filter(x => x.userId == uid);
    console.log("List", list);
    return list;
  };
  

  Mock.onPost("/api/likesDislikes/add").reply(config => {
    let vote = JSON.parse(config.data);
    console.log("Vote Post", vote.vote);
    LikeDislikesDB.list.push(vote.vote)
    return [200, LikeDislikesDB.list];
  });