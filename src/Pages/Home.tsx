import * as React from "react";

export default class Home extends React.Component {
  render() {
    const style = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    };
    return (
      <div>
        <div style={style}>
          <div>
            <div className={"container "}>
              <h2 className={"teal-text"}>ANATOMY Admin!</h2>
              <p>Anatomy tool Admin sayfasına hoşgeldiniz.</p>
              <p>İletişim:</p>
              <p>Hayri DURMAZ</p>
              <p>hayri.durmaz@tedu.edu.tr</p>
              <hr />
              <p>Arda Tümay</p>
              <p>arda.tumay@tedu.edu.tr</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
