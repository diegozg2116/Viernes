
const allPhrases = [
  "Yo sé que te he dicho mil veces",
  "Que tú pones buena suerte en mi viernes 13",
  "Que tengo tu nombre tatuado en mi piel",
  "Que ya te extraño, aunque te haya visto ayer",
  "Sostente fuerte, yo siento lo mismo que tú sientes",
  "Miradas que no mienten, sonrisas que muestran dientes",
  "Contigo todo es más que suficiente",
  "Contigo todo es más que suficiente",
  "No ocupo de alguien más, solo a ti presente",
  "Y me llevas lentamente a imaginar",
  "A una vida donde tú puedas estar",
  "Y me llevas lentamente a imaginar",
  "A una vida donde te pueda cuidar",
  "Porque si no es contigo, no es con nadie más",
  "Es algo que tú nunca, nunca entenderás",
  "Con alguien más, yo no me puedo conformar",
  "Nadie te verá como yo te voy a ver",
  "Tú tienes todo lo que busco",
  "Tienes algo en particular, algo que te hace más"
];

let remainingPhrases = [...allPhrases];
const loveBtn = document.getElementById("loveBtn");
const loveSong = document.getElementById("loveSong");

loveBtn.addEventListener("click", () => {
  if (loveSong.paused) {
    loveSong.play();
  }

  if (remainingPhrases.length === 0) {
    remainingPhrases = [...allPhrases];
  }

  const index = Math.floor(Math.random() * remainingPhrases.length);
  const phraseText = remainingPhrases.splice(index, 1)[0];

  const phrase = document.createElement("div");
  phrase.classList.add("phrase-bubble");
  phrase.textContent = phraseText;
  phrase.style.position = "absolute";
  phrase.style.visibility = "hidden";

  document.body.appendChild(phrase);

  const phraseWidth = phrase.offsetWidth;
  const x = Math.random() * (window.innerWidth - phraseWidth);
  const y = window.innerHeight - 100;

  phrase.style.left = `${x}px`;
  phrase.style.top = `${y}px`;
  phrase.style.visibility = "visible";

    setTimeout(() => {
    phrase.remove();
  }, 10000); // 10 segundos
});

// Fuegos artificiales
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.speed = Math.random() * 5 + 2;
    this.angle = Math.random() * Math.PI * 2;
    this.gravity = 0.05;
    this.alpha = 1;
    this.fade = Math.random() * 0.03 + 0.01;
    this.color = color;
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + this.gravity;
    this.alpha -= this.fade;
  }

  draw(ctx) {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  isAlive() {
    return this.alpha > 0;
  }
}

class Firework {
  constructor(x, y, isClick = false) {
    this.x = x || Math.random() * canvas.width;
    this.y = canvas.height;
    this.targetY = isClick ? y : Math.random() * canvas.height * 0.5;
    this.color = isClick ? "#ff0000" : `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.hasExploded = false;
    this.speed = 5;
    this.particles = [];
  }

  update() {
    if (!this.hasExploded) {
      this.y -= this.speed;
      if (this.y <= this.targetY) {
        this.hasExploded = true;
        for (let i = 0; i < 50; i++) {
          this.particles.push(new Particle(this.x, this.y, this.color));
        }
      }
    } else {
      this.particles.forEach(p => p.update());
      this.particles = this.particles.filter(p => p.isAlive());
    }
  }

  draw(ctx) {
    if (!this.hasExploded) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    } else {
      this.particles.forEach(p => p.draw(ctx));
    }
  }

  isDone() {
    return this.hasExploded && this.particles.length === 0;
  }
}

let fireworks = [];

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((fw, index) => {
    fw.update();
    fw.draw(ctx);
    if (fw.isDone()) fireworks.splice(index, 1);
  });

  requestAnimationFrame(animate);
}

canvas.addEventListener("click", e => {
  fireworks.push(new Firework(e.clientX, e.clientY, true));
});

setInterval(() => {
  fireworks.push(new Firework());
}, 700);

animate();


