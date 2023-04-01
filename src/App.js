import React, { useState } from "react";
import "./styles.css";
import { Layout, Badge, Card, Row, Col, Button, Divider, Input } from "antd";

const tiersArray = [
  {
    name: "Starter",
    list: "Feature List1",
    price: "30"
  },
  {
    name: "Premium",
    list: "Feature List2",
    price: "54"
  },
  {
    name: "Enterprize",
    list: "Feature List1",
    price: "99"
  }
];

const promoCodes = ["SALE13", "SALE25", "SALE40"];

export default function App() {
  const [tiers, setTiers] = useState(tiersArray);

  const [promo, setPromo] = useState("");
  const [showError, setShowError] = useState(false);

  const checkPromocode = (e) => {
    const value = e.target.value;
    setPromo(value);
    setShowError(false);
  };
  const applyPromo = (percentageValue) => {
    const tempTiers = [...tiers];

    const finalTiers = [];
    tempTiers.forEach((item) => {
      const itemObj = { ...item };
      const price = parseInt(item.price, 10);
      const reducedValue = Math.floor(price - price * (percentageValue / 100));
      finalTiers.push({ ...itemObj, price: reducedValue });
    });

    setTiers(finalTiers);
  };

  const validatePromo = () => {
    if (promo.length > 0 && promoCodes.indexOf(promo) === -1) {
      setShowError(true);
      setTiers(tiersArray);
    } else {
      setShowError(false);
      let percentageValue = promo.replace(/[^0-9]/g, "");
      applyPromo(percentageValue);
    }
  };

  return (
    <div className="App">
      <div className="TierPricing_Component">
        <Layout className="TierPricing_Layout">
          <h1>Pricing</h1>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {tiers?.length > 0 &&
              tiers.map((item) => {
                return (
                  <Col
                    key={item.name}
                    className="gutter-row"
                    sm={6}
                    md={8}
                    lg={8}
                  >
                    <div>
                      {item.name === "Premium" ? (
                        <Badge.Ribbon text="popular" color="pink">
                          <Card type="inner" title={item.name}>
                            {item.list}
                          </Card>
                          <Card type="inner">
                            <h3
                              style={{ display: "inline" }}
                            >{`$${item.price}`}</h3>
                            <Divider type="vertical" />
                            <Button type="primary">Get it now</Button>
                          </Card>
                        </Badge.Ribbon>
                      ) : (
                        <>
                          <Card type="inner" title={item.name}>
                            {item.list}
                          </Card>
                          <Card type="inner">
                            <h3
                              style={{ display: "inline" }}
                            >{`$${item.price}`}</h3>
                            <Divider type="vertical" />
                            <Button type="primary">Get it now</Button>
                          </Card>
                        </>
                      )}
                    </div>
                  </Col>
                );
              })}
          </Row>
          <div className="Promocode_Input">
            <h4>I have a promo code</h4>
            <Input
              type="text"
              name="promocode"
              id="promocode_input_text"
              className={showError ? "errorInput" : ""}
              onChange={checkPromocode}
              onBlur={validatePromo}
              value={promo}
            />
            {showError && (
              <p style={{ color: "red" }}>{"Code does not exist"}</p>
            )}
          </div>
        </Layout>
      </div>
    </div>
  );
}
