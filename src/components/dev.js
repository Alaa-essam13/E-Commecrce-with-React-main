import React from 'react';
import './dev.css';

function Dev() {
  const names = ["3laa 3ssam", "Shokry Mansour", "Mohamed Naser", "Abdelrahman Mohamed", "Enshy Makram", "Enas "];
  const phones = ["+20 102 908 8473", "+20 101 400 1055", "+20 155 745 7443", "+20 155 215 7222", "+20 101 842 7369", "+20 102 422 9282"]
  const images = ["https://media.licdn.com/dms/image/C4D03AQG87WwMVUcyXQ/profile-displayphoto-shrink_800_800/0/1641309398404?e=1708560000&v=beta&t=F1_Sxd6J2PlKP9gChm3GWZiMObqnhJnZuOsijj2U2jc",
    "https://scontent.fqtt2-1.fna.fbcdn.net/v/t39.30808-6/404989430_2123510531314679_8198693343353285242_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=J8z_h4uiD4wAX-J5U1b&_nc_ht=scontent.fqtt2-1.fna&oh=00_AfCGdHj62GEWOuZBPZKojz9xjl3Mtl5OeiQeNe4rX-BziA&oe=658BA1EF",
    "https://scontent.fqtt2-1.fna.fbcdn.net/v/t39.30808-6/411239254_3644666752440818_5933430708682717259_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=Sj300eOUUkEAX89wkEi&_nc_ht=scontent.fqtt2-1.fna&oh=00_AfAHUVdUr78qJSt56HyFB6tfCJYqVPc9RaGA2ecet4ipNg&oe=658BCAFE",
    "https://scontent.fqtt2-1.fna.fbcdn.net/v/t39.30808-6/337848469_1507514136443003_1785743297548863070_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=ScmexI3OpQEAX-eoBoV&_nc_ht=scontent.fqtt2-1.fna&oh=00_AfAuO2REanpqsB0FmxEN0tzSyj25TWw_ywlto8OBdxY3zA&oe=658C39FA",
    "", ""
  ]

  return (
    <div className="container mt-5">
      <div className="row">
        {names.map((name, index) => (
          <div key={index} className="card col-md-3 m-0 shadow hover-shake" style={{ marginRight: "5px" }}>
            <div className="text-center mt-3">
              <img src={images[index]} width="80" className="rounded-circle" alt={`User ${index + 1}`} />
              <h5 className="mt-2">{name}</h5>
              <p className="mt-2">{phones[index]}</p>
              <span className="mt-1 clearfix">React Developer</span>
              <small className="mt-2">
                CS Student
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dev;
