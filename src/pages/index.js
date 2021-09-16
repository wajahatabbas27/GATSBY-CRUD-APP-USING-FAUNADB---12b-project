import { TextField } from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import Header from "../components/header";

const Index = () => {
  const [mydata, setData] = useState("");
  return (
    <div style={{ textAlign: "center" }}>
      <Header />
      <hr />
      <br />
      <br />
      <Formik
        initialValues={{ title: "" }}
        onSubmit={async (values) => {
          console.log(values);
          const response = await fetch("/.netlify/functions/fauna-create", {
            method: "post",
            body: JSON.stringify(values),
          });
          const result = await response.json();
          setData(result);
          console.log("Data: " + JSON.stringify(result));
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <div>
              <Field
                type='text'
                as={TextField}
                variant='filled'
                label='Title::'
                name='title'
                id='title'
              />
              <br />
              <br />
              <ErrorMessage
                name='title'
                render={(msg) => {
                  <span style={{ color: "red" }}>{msg}</span>;
                }}
              />
            </div>
            <div>
              <button type='submit'>CREATE</button>
            </div>
          </Form>
        )}
      </Formik>
      <br />
      <br />
      <p>
        ID OF ABOVE TITLE IS <b>{mydata.id}</b> .
      </p>
    </div>
  );
};

export default Index;
