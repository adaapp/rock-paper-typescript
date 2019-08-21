// Define types for P5 built-in functions
declare function createCanvas(width: number, height: number): void;
declare function background(colorHex: string): void;

function preload(): void {
    game.preload()
}

function setup(): void {
    createCanvas(window.innerWidth, window.innerHeight);
}
function draw(): void {
    background('#FEE834');
    game.draw()
}
