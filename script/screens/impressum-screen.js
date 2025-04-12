class ImpressumScreen {
    /**
     * @param {HTMLCanvasElement} canvas - Das Canvas-Element, auf dem der Impressum-Screen gezeichnet wird.
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
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

        // Den Text zeilenweise zeichnen
        text.forEach((line, index) => {
            this.ctx.fillText(line, this.canvas.width / 2, 100 + index * 25);
        });
    }
}
