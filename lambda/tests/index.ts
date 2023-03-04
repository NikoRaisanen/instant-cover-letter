const { handler } = require("../src/index.ts");

const testLambdaHandler = async () => {
  const event = {
      requestContext: {
        http: {
          method: "POST",
        },
      },
      body: JSON.stringify({
        prompt: "I am a software engineer with 5 years of experience in the field. I have worked on a variety of projects, including a chatbot for a large insurance company. I am looking for a new role where I can continue to grow my skills and contribute to a team. I have a strong understanding of terraform, aws, html, css, javascript, and python",
      }),
};

const res = await handler(event, null);
console.log(res.body);
}

testLambdaHandler();