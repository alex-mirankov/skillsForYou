import React from "react";
import "./style.css";

export function Card(props) {
  return (
    <article className={"c-card main__c-card " + props.cardSize}>
      {props.children}
    </article>
  );
}
