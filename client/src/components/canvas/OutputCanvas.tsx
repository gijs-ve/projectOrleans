import { useRef, useEffect } from 'react';
import { CanvasProp } from '../../../../types/types';

const OutputCanvas = (p: CanvasProp) => {
    const canvasRef = useRef(null);
    const { game, width, height } = p;
    let s = width / (game.size + 2);
    let nX = Math.floor(width / s) - 2;
    let nY = Math.floor(height / s) - 2;
    let pX = width - nX * s;
    let pY = height - nY * s;
    let pL = Math.ceil(pX / 2) - 0.5;
    let pT = Math.ceil(pY / 2) - 0.5;
    let pR = width - nX * s - pL;
    let pB = height - nY * s - pT;
    const draw = (ctx: any) => {
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        for (var x = pL; x <= width - pR; x += s) {
            ctx.moveTo(x, pT);
            ctx.lineTo(x, height - pB);
        }
        for (var y = pT; y <= height - pB; y += s) {
            ctx.moveTo(pL, y);
            ctx.lineTo(width - pR, y);
        }
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);
        ctx.stroke();
    };

    const drawPlayers = (ctx: any) => {
        ctx.beginPath();
        ctx.fillStyle = 'red';

        ctx.fillRect(pL, pT, s, s);
        ctx.stroke();
    };

    useEffect(() => {
        const canvas: any = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        draw(context);
        drawPlayers(context);
    }, [draw]);

    return <canvas ref={canvasRef} {...p} />;
};

export { OutputCanvas };
