import React, { Component } from 'react';
import Link from 'next/link';

// import Layout from "./Layout";

export default class Homepage extends Component {
  render() {
    return (
      <div>
        <h1>Skikkelig Fancy Hotell</h1>
        <Link href="rooms">
          <a>Book Hotel</a>
        </Link>
      </div>
    );
  }
}
