import Hero from "./hero";
import Features from "./features";
import FeaturesWithImage from "./features-with-image";
import Counter from "./counter";
import CallToAction from "./call-to-action";
import Testimonials from "./testimonials";
import Pricing from "./pricing";
import FAQ from "./faq";
import Blog from "./blog";
import Newsletter from "./newsletter";

import { integrations } from "@/integrations.config";

const Home = () => {
	return (
		<>
			<Hero />
			<Features />
			<FeaturesWithImage />
			<Counter />
			<CallToAction />
			<Testimonials />
			<Pricing />
			<FAQ />
			<Newsletter />
			{integrations?.isSanityEnabled && <Blog />}
		</>
	);
};

export default Home;
