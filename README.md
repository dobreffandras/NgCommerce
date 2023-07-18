# NgCommerce

This project is created for learning and practicing technologies. A server and the corresponding client is implemented to 
simulate a stock exchange website.


# Technologies
- Server is an ASP.NET WebApi (.NET6)
- Client is an Angular application (TypeScript, SCSS)

# Setting up

## Setting up locally

Set up an MSSQL database called `angularcommercedb` (or change the connection string in the `appsettings.json`.  
Apply the Entity Framework migrations. In Visual Studio open the NuGet Package manager console and use the command: `dotnet ef database update`

You can run the server from Visual Studio. On the first run accept the creation of a self-signed certificate.
The server will run on `https://localhost:7017`.

For the client npm packages have to be installed with the `npm install` command.
Running from Visual Studio will start the client as well. Alternatively you can use the `npm run start` or `ng server` commands in the ClientApp folder. 
The client will run at `https://localhost:44408/`