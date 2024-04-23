import * as http from 'http';

export const handler = async (event) => {
    const data = JSON.parse(event.body);
    const sessionToken = data['session-token'];
    const customerId = data['customer-id'];

    const options = {
        hostname: 'ec2-18-208-200-224.compute-1.amazonaws.com',
        port: 3000,
        path: `/customers/${customerId}`,
        method: 'DELETE',
        headers: {
            'session-token': sessionToken
        }
    };
    console.log({ options });

    return await new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            res.setEncoding('utf8');
            let responseBody = '';

            res.on('data', (chunk) => {
                responseBody += chunk;
            });

            res.on('end', () => {
                resolve({
                    statusCode: 200,
                    body: JSON.stringify(responseBody),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            });
        });

        req.on('error', (err) => {
            console.error({ err });
            reject({
                statusCode: 500,
                body: JSON.stringify(err),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        });

        req.end();
    });
};
