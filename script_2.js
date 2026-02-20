// script_2.js - Bridge Building Logic
const PINCH_THRESHOLD = 40; // Sensitivity for finger touching
let blocks = []; // Array to store coordinates of created blocks

/**
 * Checks if the thumb and index finger are pinching.
 * If true, adds a new block to the bridge.
 */
function handleBridgeLogic(handLandmarks, canvasWidth, canvasHeight) {
    const thumb = handLandmarks[4];
    const index = handLandmarks[8];

    // Convert normalized coordinates to pixel coordinates
    const tX = thumb.x * canvasWidth;
    const tY = thumb.y * canvasHeight;
    const iX = index.x * canvasWidth;
    const iY = index.y * canvasHeight;

    const distance = Math.hypot(iX - tX, iY - tY);

    if (distance < PINCH_THRESHOLD) {
        const midX = (tX + iX) / 2;
        const midY = (tY + iY) / 2;

        // Add a block if it's the first one or if moved far enough from the last block
        if (blocks.length === 0 || Math.hypot(midX - blocks[blocks.length - 1].x, midY - blocks[blocks.length - 1].y) > 25) {
            blocks.push({ x: midX, y: midY });
        }
    }
}

/**
 * Renders the blocks and the connecting bridge lines.
 */
function drawBridge(ctx) {
    if (blocks.length === 0) return;

    // Draw the "Bridge" connecting lines
    ctx.beginPath();
    ctx.strokeStyle = "rgba(0, 240, 255, 0.4)";
    ctx.lineWidth = 4;
    ctx.setLineDash([5, 5]); // Optional: makes the bridge look like a blueprint line
    ctx.moveTo(blocks[0].x, blocks[0].y);
    for (let i = 1; i < blocks.length; i++) {
        ctx.lineTo(blocks[i].x, blocks[i].y);
    }
    ctx.stroke();
    ctx.setLineDash([]); // Reset dash

    // Draw the "Building Blocks"
    blocks.forEach(block => {
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#00f0ff";
        ctx.fillRect(block.x - 10, block.y - 10, 20, 20); // Square block
        ctx.strokeRect(block.x - 10, block.y - 10, 20, 20);
    });
}