module.exports = {
    reporters: [
      "default",
      ["jest-html-reporter", {
        pageTitle: "Reporte de Pruebas Jonatan Lombo",
        outputPath: "./test-report.html",
        includeFailureMsg: true,
        includeSuiteFailure: true,
      }]
    ]
  };
  