## Run the Application

Once your project is set up, you can run the application using Maven.

#### a. Using Maven Wrapper (Recommended)

If your project includes a Maven wrapper (mvnw or mvnw.cmd), you can run the application with:
On Mac/Unix:
```bash
./mvnw spring-boot:run
```


On Windows:
```bash
mvnw.cmd spring-boot:run
```

#### b. Using Maven Directly

If you have Maven installed globally on your system, you can use the mvn command:

```bash
mvn spring-boot:run
```


## Building the Project

If you want to build the project into a JAR file and run it

1. Building the jar
    ```bash
    mvn clean package
    ```
   This will generate a JAR file in the target directory.
2. Run the JAR:
    ```bash
    java -jar target/server-0.0.1-SNAPSHOT.jar
    ```