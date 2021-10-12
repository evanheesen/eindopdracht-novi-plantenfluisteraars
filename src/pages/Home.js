import React from "react";
import NavBar from "../components/navBar/NavBar";

function Home() {
    return (
      <>
<header>
    <img src="" alt=""/>
    <nav>
        <ul>
            <li><a href="/concept">Concept</a></li>
            <li><a href="/prijzen">Prijzen</a></li>
            <li><a href="/over-ons">Over ons</a></li>
            <li><a href="/aanvragen">Aanvragen</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/">Log uit</a></li>
        </ul>
    </nav>
</header>
      </>
    );
}

export default Home;