import mirageBg from "../assets/images/maps/mirage.png";
import infernoBg from "../assets/images/maps/inferno.png";
import overpassBg from "../assets/images/maps/overpass.png";
import ancientBg from "../assets/images/maps/ancient.png";
import nukeBg from "../assets/images/maps/nuke.png";
import vertigoBg from "../assets/images/maps/vertigo.png";
import anubisBg from "../assets/images/maps/anubis.png";
import {ancientLogo, mirageLogo, infernoLogo, anubisLogo, nukeLogo, vertigoLogo, overpassLogo} from "../assets/images/mapLogos/mapLogos";

const maps = [
    {
        name: "Mirage",
        bgImage: mirageBg,
        href: "mirage",
        logo: mirageLogo,
    },
    {
        name: "Inferno",
        bgImage: infernoBg,
        href: "inferno",
        logo: infernoLogo,
    },
    {
        name: "Overpass",
        bgImage: overpassBg,
        href: "overpass",
        logo: overpassLogo,
    },
    {
        name: "Ancient",
        bgImage: ancientBg,
        href: "ancient",
        logo: ancientLogo,
    },
    {
        name: "Nuke",
        bgImage: nukeBg,
        href: "nuke",
        logo: nukeLogo,
    },
    {
        name: "Vertigo",
        bgImage: vertigoBg,
        href: "vertigo",
        logo: vertigoLogo,
    },
    {
        name: "Anubis",
        bgImage: anubisBg,
        href: "anubis",
        logo: anubisLogo,
    },
]

export {maps};