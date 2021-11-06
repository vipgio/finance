const contentful = require("contentful-management");

const client = contentful.createClient({
	accessToken: "<FYR9n1Y7T1wOypOe1vObsgNJkU_M2fqtN8T_NznjZzE>",
});

client
	.getSpace("5rirqymvemuy")
	.then((space) => space.getEnvironment("master"))
	.then((environment) => environment.getLocales())
	.then((response) => console.log(response.items))
	.catch(console.error);
