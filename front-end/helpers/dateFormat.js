export default function formatedTimestamp(d) {
    const date = d.toISOString().split('T')[0].split('-').reverse().join('/');
    let time = d.toTimeString().split(' ')[0];

    // removendo segundos
    let timeNoSec = time.split(':');
    timeNoSec.pop();
    time = timeNoSec.join(':');

    return `${date} ${time}`
};