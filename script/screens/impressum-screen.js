class ImpressumScreen {
    /**
     * @param {HTMLCanvasElement} canvas - Das Canvas-Element, auf dem der Impressum-Screen gezeichnet wird.
     * @param {function} exitGameCallback - Callback, der beim Klick auf den „Menü“-Button ausgeführt wird (zurück zum Startscreen).
     */
    constructor(canvas, exitGameCallback) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.exitGameCallback = exitGameCallback;
      this.button = {
        label: 'Menü',
        width: 200,
        height: 50,
        x: 0, 
        y: 0  
      };
    }
  
    show() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.font = '20px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = 'black';
      this.ctx.fillText("Impressum:", this.canvas.width / 2, 50);  
      this.ctx.font = '16px Arial';
      const text = [
        "Angaben gemäß § 5 TMG:",
        "Ray Don",
        "Am Yachthaven 1",
        "18950 Rostock",
        "",
        "Kontakt:",
        "Telefon: 0177559880",
        "E-Mail: ray@developing-sailor.com"
      ];
      text.forEach((line, index) => {
        this.ctx.fillText(line, this.canvas.width / 2, 100 + index * 25);
      });
      this.button.x = (this.canvas.width - this.button.width) / 2;
      this.button.y = this.canvas.height - 100;
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      this.ctx.fillRect(this.button.x, this.button.y, this.button.width, this.button.height);
      this.ctx.fillStyle = 'black';
      this.ctx.font = '18px Arial';
      this.ctx.fillText(this.button.label, this.canvas.width / 2, this.button.y + this.button.height / 2 + 10);
    }
    handleClick(event) {
      const rect = this.canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;
      
      if (
        clickX > this.button.x &&
        clickX < this.button.x + this.button.width &&
        clickY > this.button.y &&
        clickY < this.button.y + this.button.height
      ) {
        if (typeof this.exitGameCallback === 'function') {
          this.exitGameCallback();
        }
      }
    }
  }
  
