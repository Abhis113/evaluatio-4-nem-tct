function generateScore(a, s, weight) {
  const attempt = cy.state("runnable")._currentRetry;
  s = attempt === 1 ? -weight : weight;
  a += s;
  a = a < 0 ? 0 : a;
  return a;
}

describe("Test", function () {
  let acc_score = 0;
  let score = 0;
  const users = [
    // { link: "https://rct-101-e1.herokuapp.com/", userId: "rct-201.e1" },
    { link: "http://localhost:3000/", userId: "rct-201.e1.local" },
  ];
  users.map((user) => {
    it("checking Basic Structure", { retries: 1 }, () => {
      //for 2 marks

      // clock
      cy.visit(user.link);
      let clock = cy.get("[data-testid=clock]");
      clock.should("exist");
      clock.get("[data-testid=clock-label]").should("exist");
      clock.get("[data-testid=clock-hours]").should("exist");
      clock.get("[data-testid=clock-minutes]").should("exist");
      clock.get("[data-testid=clock-seconds]").should("exist");

      let list1 = cy.get("[data-testid=list1]");
      list1.should("exist");
      list1.get("[data-testid=list1-label]").should("exist");
      list1.get("[data-testid=list1-element]").should("exist");
      list1.get("[data-testid=list1-input]").should("exist");
      list1.get("[data-testid=list1-btn-append-start]").should("exist");
      list1.get("[data-testid=list1-btn-pop-end]").should("exist");
      list1.get("[data-testid=list1-btn-clear]").should("exist");
      list1.get("[data-testid=list1-btn-reset]").should("exist");

      let list2 = cy.get("[data-testid=list2]");
      list2.should("exist");
      list2.get("[data-testid=list2-label]").should("exist");
      list2.get("[data-testid=list2-element]").should("exist");
      list2.get("[data-testid=list2-input]").should("exist");
      list2.get("[data-testid=list2-btn-append-end]").should("exist");
      list2.get("[data-testid=list2-btn-pop-start]").should("exist");
      list2.get("[data-testid=list2-btn-clear]").should("exist");
      list2.get("[data-testid=list2-btn-reset]").should("exist");

      acc_score = generateScore(0, score, 2);
    });

    it("Check clock Rendering", { retries: 1 }, () => {
      cy.visit(user.link);

      let time = new Date();

      cy.get("[data-testid=clock-hours]").should(
        "have.text",
        time.getHours().toString()
      );
      cy.get("[data-testid=clock-minutes]").should(
        "have.text",
        time.getMinutes().toString()
      );
      cy.get("[data-testid=clock-seconds]").should(
        "have.text",
        time.getSeconds().toString()
      );

      acc_score = generateScore(acc_score, score, 2);
    });

    it("Check appendStart", { retries: 1 }, () => {
      cy.visit(user.link);
      cy.get("[data-testid=list1-element]")
        .its("length")
        .then((oldLength) => {
          cy.get("[data-testid=list1-input]")
            .type(10)
            .then(() => {
              cy.get("[data-testid=list1-btn-append-start]").click();
              cy.get("[data-testid=list1-element]")
                .first()
                .should("have.text", 10);
            });

          cy.get("[data-testid=list1-element]")
            .its("length")
            .then((newLength) => {
              cy.wrap(newLength).should("eq", oldLength + 1);
            });
        });

      acc_score = generateScore(acc_score, score, 2);
    });

    it("Check popEnd", { retries: 1 }, () => {
      cy.visit(user.link);
      cy.get("[data-testid=list1-element]")
        .its("length")
        .then((oldLength) => {
          cy.get("[data-testid=list1-input]")
            .type(10)
            .then(() => {
              cy.get("[data-testid=list1-btn-pop-end]").click();
            });

          cy.get("[data-testid=list1-element]")
            .its("length")
            .then((newLength) => {
              cy.wrap(newLength).should("eq", oldLength - 1);
            });
        });
      acc_score = generateScore(acc_score, score, 1);
    });

    it("Check appendEnd", { retries: 1 }, function () {
      cy.visit(user.link);
      cy.get("[data-testid=list2-element]")
        .its("length")
        .then((oldLength) => {
          cy.get("[data-testid=list2-input]")
            .type(10)
            .then(() => {
              cy.get("[data-testid=list2-btn-append-end]").click();
              cy.get("[data-testid=list2-element]")
                .last()
                .should("have.text", 10);
            });

          cy.get("[data-testid=list2-element]")
            .its("length")
            .then((newLength) => {
              cy.wrap(newLength).should("eq", oldLength + 1);
            });
        });
      acc_score = generateScore(acc_score, score, 2);
    });

    it("Check popStart", { retries: 1 }, () => {
      cy.visit(user.link);
      cy.get("[data-testid=list2-element]")
        .its("length")
        .then((oldLength) => {
          cy.get("[data-testid=list2-input]")
            .type(10)
            .then(() => {
              cy.get("[data-testid=list2-btn-pop-start]").click();
            });

          cy.get("[data-testid=list2-element]")
            .its("length")
            .then((newLength) => {
              cy.wrap(newLength).should("eq", oldLength - 1);
            });
        });
      acc_score = generateScore(acc_score, score, 1);
    });

    it(`${user.link} Generate score`, async () => {
      acc_score = acc_score === 0 ? 1 : acc_score;
      acc_score = acc_score === 10 ? 9 : acc_score;
      console.log(`${user.link} final score: `, acc_score);

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        ...user,
        score: user.link.trim().length != 0 ? acc_score : 0,
        time: new Date(),
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch("http://localhost:2445/scores/", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));

      cy.wait(2000);
    });
  });
});
