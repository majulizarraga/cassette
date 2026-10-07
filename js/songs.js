const cassetteCollection = [
  {
    id: 1,
    title: "Sunflower",
    artist: "Harry Styles",
    note: "Me recuerda tanto a las tardes juntos riéndonos de cualquier cosa sin importar la hora.",
    signature: "Tu persona favorita",
    lyrics: `Sunflower seeds, smile for me\nI got some flowers for you\nI couldn't help but dream\nOf you and me.`,
    audioUrl: "audio/track1.mp3",
    spotifyUrl: "https://open.spotify.com/track/4e5olZZ8lhpyTBs0qirNV3",
    colors: { shell: "#B8D5C8", label: "#E5F0EB" } // Matcha Sage
  },
  {
    id: 2,
    title: "Roses",
    artist: "Jenna Raine",
    note: "Esta canción me hace pensar en cómo todo florece más bonito desde que estamos juntos.",
    signature: "Siempre tú",
    lyrics: `I hope you get your roses\nWhile you can still smell them\nI hope you know I mean it\nEvery single word.`,
    audioUrl: "audio/track2.mp3",
    spotifyUrl: "https://open.spotify.com/track/1qEmFtyABixEZuXQ9p0h82",
    colors: { shell: "#F7C5B8", label: "#FDEDE8" } // Peach
  },
  {
    id: 3,
    title: "golden hour",
    artist: "JVKE",
    note: "Justo como la luz dorada de la tarde, iluminas cualquier día nublado.",
    signature: "Con todo mi amor",
    lyrics: `It's your world, and I'm just in it\nJust don't wake me up\n'Cause I'm falling in love.`,
    audioUrl: "audio/track3.mp3",
    spotifyUrl: "https://open.spotify.com/track/5eeu5pZzY4Z3YyYyYyYyYy",
    colors: { shell: "#FCE5A4", label: "#FEF7E3" } // Amarillo Mantequilla
  },
  {
    id: 4,
    title: "Until I Found You",
    artist: "Stephen Sanchez",
    note: "No sabía cuánto me faltabas hasta que llegaste a mi vida.",
    signature: "Para siempre",
    lyrics: `I used to say\nI would never fall in love until I found her\nI was said, "I would never fall, unless it's you I fall into".`,
    audioUrl: "audio/track4.mp3",
    spotifyUrl: "https://open.spotify.com/track/0T5iIrXA4p5G9F2BQ5mmpd",
    colors: { shell: "#BDD8E9", label: "#EBF3F8" } // Celeste Pastel
  },
  {
    id: 5,
    title: "Lover",
    artist: "Taylor Swift",
    note: "¿Puedo ir a donde vayas? Gracias por este primer año tan increíble.",
    signature: "Tu compañer@ de aventuras",
    lyrics: `Can I go where you go?\nCan we always be this close forever and ever?\nAnd ah, take me out, and take me home.`,
    audioUrl: "audio/track5.mp3",
    spotifyUrl: "https://open.spotify.com/track/1dGr1nsAZOsDuQV59Gtiyt",
    colors: { shell: "#EABCC6", label: "#F9ECEF" } // Rosa Suave
  },
  {
    id: 6,
    title: "Sunday Morning",
    artist: "Maroon 5",
    note: "Mis domingos favoritos son contigo, sin prisas y con café.",
    signature: "Tu amor",
    lyrics: `Sunday morning, rain is falling\nSteal some covers, share some skin\nClouds are shrouding us in moments unforgettable.`,
    audioUrl: "audio/track6.mp3",
    spotifyUrl: "https://open.spotify.com/track/5qiiBwb1vdVOjhOmBAFq9g",
    colors: { shell: "#D6C7E2", label: "#F3EFF7" } // Lavanda
  },
  {
    id: 7,
    title: "Yellow",
    artist: "Coldplay",
    note: "Mira las estrellas, mira cómo brillan por ti.",
    signature: "Con amor",
    lyrics: `Look at the stars\nLook how they shine for you\nAnd everything you do.`,
    audioUrl: "audio/track7.mp3",
    spotifyUrl: "https://open.spotify.com/track/3AJwUDP919kvQ9QcozQPxg",
    colors: { shell: "#F3D8A2", label: "#FAF1DF" }
  },
  {
    id: 8,
    title: "Beyond",
    artist: "Leon Bridges",
    note: "Me pregunto si sabes lo mucho que te amo cada segundo.",
    signature: "Siempre contigo",
    lyrics: `I'm scared to death that she might be it\nThat the love is real, that I have decided.`,
    audioUrl: "audio/track8.mp3",
    spotifyUrl: "https://open.spotify.com/track/1OubIZ0AryCUq5kceYUQiO",
    colors: { shell: "#C2DDC8", label: "#EDF6F0" }
  },
  {
    id: 9,
    title: "Electric Love",
    artist: "BØRNS",
    note: "Tu energía y tu alegría siempre me contagian.",
    signature: "Tu cómplice",
    lyrics: `Baby, you're like lightning in a bottle\nI can't let you go now that I got it.`,
    audioUrl: "audio/track9.mp3",
    spotifyUrl: "https://open.spotify.com/track/2GiJYvgVaD2HtM8GqD9L82",
    colors: { shell: "#F5C2B4", label: "#FBECE8" }
  },
  {
    id: 10,
    title: "Adore You",
    artist: "Harry Styles",
    note: "Caminaría por el fuego por ti, sin dudarlo ni un segundo.",
    signature: "Tu persona favorita",
    lyrics: `Walk in your rainbow paradise\nStrawberry lipstick state of mind\nI'd walk through fire for you.`,
    audioUrl: "audio/track10.mp3",
    spotifyUrl: "https://open.spotify.com/track/3jjujdu2nv49GUGV3VAeW2",
    colors: { shell: "#C2DFEE", label: "#EEF6FA" }
  },
  {
    id: 11,
    title: "Fly Me to the Moon",
    artist: "Frank Sinatra",
    note: "Un clásico eterno para nuestro amor.",
    signature: "Por muchos años más",
    lyrics: `In other words, hold my hand\nIn other words, baby, kiss me.`,
    audioUrl: "audio/track11.mp3",
    spotifyUrl: "https://open.spotify.com/track/5b7OgznPJJr1vNXFe4iooq",
    colors: { shell: "#DFD1E9", label: "#F6F2F9" }
  },
  {
    id: 12,
    title: "Stand by Me",
    artist: "Ben E. King",
    note: "Gracias por estar siempre ahí. ¡Feliz primer año de muchos!",
    signature: "Te amo infinitamente",
    lyrics: `No I won't be afraid\nJust as long as you stand, stand by me.`,
    audioUrl: "audio/track12.mp3",
    spotifyUrl: "https://open.spotify.com/track/3SdTKo2uVsxFblQjpRTggM",
    colors: { shell: "#F7DBA7", label: "#FCF4E4" }
  }
];
