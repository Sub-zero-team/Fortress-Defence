function progressBar(context, x, y, w, h, power, maxPower) {
    // The progress bar
    progressBody(context, x, y, w, h, h / 2);
    progress(context, x, y, power * w / 100, h, h / 2, w);

    // Progress power text
    context.fillStyle = 'white';
    context.font = '13px Consolas';
    context.fillText(power + "/" + maxPower, x + w / 2 - 2 * h / 2, y + 3 * h / 4);

    function progressBody(ctx, x, y, width, height, radius) {
        ctx.save();
        ctx.shadowBlur = 5;
        ctx.shadowColor = 'gray';
        ctx.fillStyle = 'rgba(0,0,0,0.5)';

        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.arc(x + width - radius, y + radius, radius, -Math.PI / 2, Math.PI / 2);
        ctx.lineTo(x + radius, y + height);
        ctx.arc(x + radius, y + radius, radius, Math.PI / 2, 3 * Math.PI / 2);
        ctx.fill();
        ctx.restore();
    }

    function progress(ctx, x, y, width, height, radius, w) {
        var gradient = context.createLinearGradient(0, y + h, 0, 0);
        gradient.addColorStop(0, 'red');
        gradient.addColorStop(0.3, 'white');
        context.fillStyle = gradient;
        width--;
        var position = 0;
        ctx.beginPath();
        if (width < radius) {
            position = radius - Math.sqrt(radius * radius - Math.pow((radius - width), 2));
            ctx.moveTo(x + width, y + position);
            ctx.lineTo(x + width, y + height - position);
            ctx.arc(x + radius, y + radius, radius,
                Math.PI - Math.acos((radius - width) / radius),
                Math.PI + Math.acos((radius - width) / radius));
        } else {
            ctx.arc(x + radius, y + radius, radius, Math.PI / 2, 3 * Math.PI / 2);
            if (width + radius > w) {
                position = radius - Math.sqrt(radius * radius - Math.pow(radius - w + width, 2));
                ctx.rect(x + radius, y, width - 2 * radius, height);
                ctx.arc(x + w - radius + 1, y + radius, radius, -Math.PI / 2, -Math.acos((radius - w + width) / radius));
                ctx.arc(x + w - radius + 1, y + radius, radius,
                    Math.acos((radius - w + width) / radius),
                    Math.PI / 2);
            } else {
                ctx.rect(x + radius, y, width - radius, height);
            }
        }

        ctx.closePath();
        ctx.fill();
    }
}