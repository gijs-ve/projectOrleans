import { useRef, useEffect } from 'react';
import { CanvasProp, Square } from '../../../../types/types';
import { getEdges } from './getEdges';

const OutputCanvas = (p: CanvasProp) => {
    const canvasRef = useRef(null);

    const { game, width, height } = p;
    const edges = getEdges(game.size);
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
        ctx.strokeStyle = 'black';
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
        game.players.map((i) => {
            if (!i.position) return;
            ctx.beginPath();
            switch (i.playerId) {
                case 0:
                    ctx.fillStyle = 'red';
                    break;
                case 1:
                    ctx.fillStyle = 'blue';
                    break;
                case 2:
                    ctx.fillStyle = 'green';
                    break;
                case 3:
                    ctx.fillStyle = 'orange';
                    break;
                case 4:
                    ctx.fillStyle = 'yellow';
                    break;
            }
            ctx.fillRect(
                pL + pL * (i.position.x - 1),
                pT + pT * (i.position.y - 1),
                s,
                s,
            );
            ctx.stroke();
        });
    };

    const drawFilledSquares = (ctx: any) => {
        game.filledSquares.map((i: Square) => {
            ctx.beginPath();
            switch (i.playerId) {
                case 0:
                    ctx.fillStyle = 'red';
                    break;
                case 1:
                    ctx.fillStyle = 'blue';
                    break;
                case 2:
                    ctx.fillStyle = 'green';
                    break;
                case 3:
                    ctx.fillStyle = 'orange';
                    break;
                case 4:
                    ctx.fillStyle = 'yellow';
                    break;
            }
            ctx.fillRect(pL + pL * (i.x - 1), pT + pT * (i.y - 1), s, s);
            ctx.stroke();
        });
    };

    const drawEdges = (ctx: any) => {
        edges.map((i: Square) => {
            ctx.beginPath();
            ctx.fillStyle = 'gray';
            ctx.fillRect(pL + pL * (i.x - 1), pT + pT * (i.y - 1), s, s);
            ctx.stroke();
        });
    };

    useEffect(() => {
        const canvas: any = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        draw(context);
        drawPlayers(context);
        drawFilledSquares(context);
        drawEdges(context);
    }, [draw]);

    return <canvas ref={canvasRef} {...p} />;
};

export { OutputCanvas };
