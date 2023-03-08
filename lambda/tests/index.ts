const { handler } = require("../src/index.ts");

const testLambdaHandler = async () => {
  const event = {
      requestContext: {
        http: {
          method: "POST",
        },
      },
      body: JSON.stringify({
        prompt: "I am a software engineer with 3 years of experience in the industry. I am confident in my ability to write javacript, typescript, and python. I also have experience as an application security engineer, where I built internal security tooling. I've been exposed to how CI/CD pipelines work and have even created my own stages in these pipelines. Some random skills I have are: aws, terraform, and unit testing",
        jobDescription: `About the job
        At Netflix, we do one thing - entertainment - and we aim to do it really well at scale. We have a strong engineering organization that enables us to achieve these business objectives and a unique culture that guides us. This also means that our security team needs to operate differently than a traditional security team. We do not operate with traditional gating mechanisms but instead focus on enabling our customers. We provide them with clear, opinionated security guidance and usable, scalable, secure by default offerings to make pragmatic risk decisions for Netflix.
        The Application Security teams at Netflix are responsible for securing the software footprint that we create to run the Netflix product, the Netflix studio, and the business. We have previously invested in the idea of strategic security partnerships and engineering investments to scale our Application Security program. As the Netflix business and engineering workforce has grown, our software footprint has also grown and become more heterogeneous. We are now complementing our security partnerships and engineering investments with increased investments to serve the Appsec Professional Services charter (services like bug bounty, pentesting, product security incident response, threat modeling, security reviews, and developer security education).
        We are hiring an Application Security Engineer for the newly formed Appsec Reviews and Assessments team. In this role, you will work closely with engineering teams that build software to support the Netflix product, studio and enterprise to provide critical Appsec services. We are looking for folks who are excited about pragmatic risk, continuous operational improvement and customer-centric security experiences.
        
        Desired Background
        
        You have a strong application security background with a focus on providing practical technical guidance to engineering teams
        You have experience with threat modeling, security design reviews, security architecture, pentesting and bug bounty handling
        You have experience working collaboratively with engineers
        You have strong verbal and written communication skills
        
        Finally, here are a few more reasons why we love this work and think that you will too:
        
        You will work with an industry-leading security team with many learning and growth opportunities.
        You will have the opportunity to research new ideas and share your ideas across the community.
        You will work closely with domain experts in diverse areas such as microservices architecture, big data, compute platforms, and content delivery networks.
        
        Netflix allows the security team to approach security differently. We’ve shaped our security principles to align with our culture of “Freedom and Responsibility” and “Context not Control.” Employees have tremendous freedom in their work, along with the corresponding responsibility and the accountability to do the right thing for Netflix. Read more about the Netflix culture here.
        We are an equal opportunity employer and celebrate diversity, recognizing that diversity of thought and background builds stronger teams. We approach diversity and inclusion seriously and thoughtfully. We do not discriminate based on race, religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, or disability status.`
      }),
    };
    const res = await handler(event, null);
    return res

}

testLambdaHandler().then((res) => {
    console.log(res)
    console.log(JSON.parse(res.body).coverLetter)
}).catch(() => {
    console.log('catch... this should not happen');
});