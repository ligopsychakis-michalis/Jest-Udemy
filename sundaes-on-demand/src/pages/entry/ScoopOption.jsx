import React, { useState } from 'react'
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const ScoopOption = ({ name, imagePath, updateItemCount }) => {
  const [isInvalid, setIsInvalid] = useState(false);

  function handleChange(event) {
    if (parseInt(event.target.value) >= 0) {
      updateItemCount(name, event.target.value, "scoops");
    }

    setIsInvalid(parseInt(event.target.value) < 0)  
  }

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`} />
      <Form.Group
        controlId={`${name}--count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type={"number"}
            defaultValue={0}
            onChange={handleChange}
            isInvalid={isInvalid}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ScoopOption;
