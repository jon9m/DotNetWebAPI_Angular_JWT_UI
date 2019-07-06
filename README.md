# PTC

proxy.conf.json

{
  "/api": {
    "target": "https://localhost:5001",
    "secure": false
  }
}


angular.json

 "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "PTC:build",
            "proxyConfig": "proxy.conf.json"
          },
          ....


---------------------------------------
startup.cs

// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();

//**************************************************************************************
            // app.UseCors(
            //         options => options.WithOrigins(
            //           "http://localhost:4200").AllowAnyMethod().AllowAnyHeader()
            //       );
//**************************************************************************************            

            app.UseMvc();
        }
