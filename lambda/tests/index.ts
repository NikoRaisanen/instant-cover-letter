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
        jobDescription: `About the job
        The telco industry is moving to software-defined services. This transformation is driven by open source software, cloud computing and the move to VNF / CNF approaches. Canonical Ubuntu is a key platform for telco innovation, and we are growing our team of specialists who work in the industry to accelerate the change.
        
        Canonical enables operators and communications service providers to embrace this new world, with a focus on platforms such as Ubuntu, OpenStack, and Kubernetes, and reusable, high quality automation for operations at scale.
        
        As part of the Canonical Field Engineering organization, you will lead customers through the design and delivery of OpenStack, Kubernetes, and software-defined networking solutions. Your passion for open-source technologies will enable customers to understand and operate advanced infrastructure substrates to meet the demands of 5G and beyond.
        
        What you'll do
        Match customer requirements to advanced capabilities in the VNF/CNF/NFVi/NFVO/VNFM/VIM/MEC space
        Provide technical pre-sales consulting to Service Provider teams
        Design and implement telco-grade open source multi-tenant private clouds and micro clouds
        Investigate, report and/or fix software defects uncovered during customer deployments
        Demonstrate advanced Infrastructure as code (IaC) techniques relevant to telco
        Architect and implement advanced, resilient Service Provider Cloud and Application solutions
        Design and deliver software defined infrastructure with OpenStack, Kubernetes, MAAS and Ceph
        Learn model-driven operations with Juju charms for Kafka, Hadoop, PostgreSQL, MongoDB, NGINX, and more
        Help customers adopt advanced Bare Metal, Public, Private and Hybrid Cloud solutions
        Learn from customer engagements and drive meaningful product improvements
        Shape our roadmap to accelerate our growth in the telco market
        
        Mandatory skills
        Python software development experience
        A thorough understanding of the telco NFVi (VIM), NFVO, VNFM and MEC space
        Technical understanding of key telco technologies like CPU Pinning, NUMA, SRIOV, DPDK, etc
        
        Relevant skills
        A thorough working understanding of the architectures and infrastructure of MNOs and CSPs
        Working knowledge of Mobile Packet Core, Radio, VAS, OSS/BSS
        Understanding the infrastructure requirements for modern virtualized NF deployments
        Thought leadership and the ability to lead architecture discussions about ETSI and/or 3GPP standards
        Understanding of best practices for open source technology in telco virtualisation roadmaps
        Architect level understanding and practical experience of telco workload demand
        Working knowledge of Linux, Openstack and Kubernetes networking
        A passion to automate and improve all aspects of open source products and tooling
        Ability to lead complex projects from start to finish
        A collaborative attitude with a keen eye on customer success
        Excellent communication and presentation abilities
        Able to travel up to 50% of the time for events, customer meetings, project delivery
        BS Computer Science or STEM
        
        Ways to stand out from the crowd
        Widely spoken second language such as Japanese, French, German, Spanish or Portuguese
        Track record of open source contributions
        
        Canonical is a growing international software company that works with the open-source community to deliver Ubuntu, the world's best free software platform.Our services help businesses worldwide reduce costs, improve efficiency and enhance security with Ubuntu.
        
        We are proud to foster a workplace free from discrimination. Diversity of experience, perspectives, and background create a better work environment and better products. Whatever your identity we will give your application fair consideration.`
      }),
    };
    try {
        const res = await handler(event, null);
        console.log(res.data);
    } catch(err) {
        console.log('ERROR: ', err)
    }
    
}

testLambdaHandler();