const { exec } = require('child_process');

const command = `npx webpack `;

exec(command, (error, stdout, stderr) => {
    if (!error) {
        console.log(stdout);
    } else {
        console.error(error);
    }
});


