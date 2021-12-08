import React from 'react';
import ReactDOM from 'react-dom';

import {
  FlexBox,
  Heading,
  SpectacleLogo,
  UnorderedList,
  CodeSpan,
  OrderedList,
  ListItem,
  FullScreen,
  Progress,
  Appear,
  Stepper,
  Slide,
  Deck,
  Text,
  Grid,
  Box,
  Image,
  CodePane,
  MarkdownSlide,
  MarkdownSlideSet,
  Notes,
  fadeTransition, Link
} from 'spectacle';

const formidableLogo =
  'https://avatars2.githubusercontent.com/u/5078602?s=280&v=4';

// SPECTACLE_CLI_THEME_START
const theme = {
  fonts: {
    header: '"Open Sans Condensed", Helvetica, Arial, sans-serif',
    text: '"Open Sans Condensed", Helvetica, Arial, sans-serif'
  }
};
// SPECTACLE_CLI_THEME_END

// SPECTACLE_CLI_TEMPLATE_START
const template = () => (
  <FlexBox
    justifyContent="space-between"
    position="absolute"
    bottom={0}
    width={1}
  >
    <Box padding="0 1em">
      <FullScreen />
    </Box>
    <Box padding="1em">
      <Progress />
    </Box>
  </FlexBox>
);
// SPECTACLE_CLI_TEMPLATE_END

const transition = {
  from: {
    transform: 'scale(0.5) rotate(45deg)',
    opacity: 0
  },
  enter: {
    transform: 'scale(1) rotate(0)',
    opacity: 1
  },
  leave: {
    transform: 'scale(0.2) rotate(315deg)',
    opacity: 0
  }
};


const Presentation = () => (
  <Deck theme={theme} template={template}>

    <Slide>
      <FlexBox height="100%" flexDirection="column">
        <Heading margin="0px" fontSize="150px">
          <i>E2E Testing</i>
        </Heading>
        <Heading margin="0px 32px" color="primary" fontSize="h3">
          Is it worth the effort, or is it to much work to maintain?
        </Heading>
        <Heading margin="0px 32px" color="primary" fontSize="h6" fontStyle="italic">
          Disclaimer -> I'm still fairly new to cypress so take what I say with a <del>grain</del> ton of salt :)
        </Heading>
      </FlexBox>
    </Slide>
    <Slide transition={transition}
           backgroundImage="url(https://cdn-contents.anymindgroup.com/corporate/wp-uploads/2021/09/28103833/pyramid.png)"
           backgroundOpacity={0.3}>
      <Appear>
        <Heading>Testing pyramid</Heading>
      </Appear>
      <UnorderedList>
        <Appear>
          <ListItem>
            <CodeSpan>Priorities based on cost / effort</CodeSpan>
          </ListItem>
          <ListItem>
            <CodeSpan>Unit tests are easy to write/maintain</CodeSpan>
          </ListItem>
          <ListItem>
            <CodeSpan>Integration tests as a middle-ground</CodeSpan>
          </ListItem>
        </Appear>
        <Appear>
          <ListItem>
            <CodeSpan>Cost/effort vs value</CodeSpan>
          </ListItem>
          <ListItem>
            <CodeSpan>E2E considered high-effort/high-cost</CodeSpan>
          </ListItem>
        </Appear>
      </UnorderedList>
      <Notes>
        - Old way of thinking about tests<br />
        - Still holds true for backend/cli apps<br />
        - Introduced in the early 2000s by Martin Fowler<br />
      </Notes>
    </Slide>
    <Slide transition={transition} backgroundOpacity={0.3} backgroundSize="50%" backgroundImage="url(https://pbs.twimg.com/media/DVUoM94VQAAzuws?format=jpg&name=900x900)">
      <Appear>
        <Heading>Testing trophy</Heading>
        <UnorderedList>
          <ListItem>
            <CodeSpan>Priorities based on value</CodeSpan>
          </ListItem>
          <ListItem>
            <CodeSpan>Primary focus on integration testing</CodeSpan>
          </ListItem>
          <ListItem>
            <CodeSpan>Focus more on e2e</CodeSpan>
          </ListItem>
          <ListItem>
            <CodeSpan>"Static tests" = flow, typescript, eslint ++</CodeSpan>
          </ListItem>
        </UnorderedList>
      </Appear>
      <Notes>
        - More "gui" based way of testing<br />
        - Coined by Kent C Dodds<br />
        - Equal amounts of e2e & unit tests, give or take<br />
      </Notes>
    </Slide>
    <Slide transition={transition}>
      <Heading>E2E Testing / Cypress</Heading>
      <UnorderedList>
        <ListItem>
          <CodeSpan>"Robot" running our tests</CodeSpan>
        </ListItem>
        <ListItem>
          <CodeSpan>Tests written from a user perspective</CodeSpan>
        </ListItem>
        <ListItem>
          <CodeSpan>Outputs videos / screenshots</CodeSpan>
        </ListItem>
        <ListItem>
          <CodeSpan>Can (partially) replace regression tests</CodeSpan>
        </ListItem>
        <ListItem>
          <CodeSpan>@testing-library/cypress</CodeSpan>
        </ListItem>
      </UnorderedList>
      <Notes>
        - Test as a user. Find items by text and click on them.<br />
        - Save to the server, and verify server response<br />
        - Videos / screenshots can be used to understand why tests fail<br />
        - Time travel allows to check ui-state before/after test<br />
        - Can be based on test-scripts / acceptance criterias<br />
        - Simplifies TDD for ui-applications<br />
      </Notes>
    </Slide>
    <Slide transition={transition}>
      <CodePane language="typescript">
        {
         `
// Grossly simplified example, obviously.. :)

// Story:
// As a user, I need to be able to add a todo where status defaults to pending
// Criteria:
// Given user sets title of todo, save should store the todo in database

  it('Should be possible to add a todo with default status "Pending"', () => {
    cy.contains('label', 'Title') // Find input by label-text
      .type('Type title', {delay: 200}) // 200ms delay between keystrokes
    cy.contains('label', 'Description')
      .type('Type description')
    cy.contains('label', 'State')
      .within(() => cy.get('select') // Find select within label
        .invoke('val') // Get value
        .should('equal', State.PENDING.toString(10)) // Assert value is '0' by default
  )

    saveAndVerify('POST'); // Helper method
  });
});`
        }
      </CodePane>
    </Slide>
    <Slide transition={transition}>
      <Heading>Demo / Solid 5/7 todo-app</Heading>
      <UnorderedList>
        <ListItem>
          <CodeSpan>Headless</CodeSpan>
        </ListItem>
        <ListItem>
          <CodeSpan>Watch-mode</CodeSpan>
        </ListItem>
        <ListItem>
          <CodeSpan>Serve or point at url</CodeSpan>
        </ListItem>
      </UnorderedList>
    </Slide>
    <Slide transition={transition}>
      <Heading>Github action</Heading>
      <CodePane language="yml"  highlightRanges={[
        [5, 6], [7, 8], [9,14]
      ]}>{`
  run:
    name: Run E2E tests
    steps:
      - uses: actions/checkout@v2
      - name: Set up output dir
        run: mkdir cy-output
      - name: Build images and run tests
        run: docker-compose run cypress
      - name: Create artifact for videos
        if: always()
        uses: actions/upload-artifact@v2
        with:
          name: test-videos
          path: ./cy-output
      `}</CodePane>
    </Slide>
    <Slide transition={transition}>
      <Heading>Tools</Heading>
      <UnorderedList>
        <ListItem>
          <Link href="https://nx.dev">nrwl/nx</Link>
        </ListItem>
        <ListItem>
          <Link href="https://testing-library.com/docs/cypress-testing-library">@testing-library/cypress</Link>
        </ListItem>
        <ListItem>
          <Link href="https://docs.docker.com/compose/reference/run/">Docker, docker-compose</Link>
        </ListItem>
      </UnorderedList>
    </Slide>
  </Deck>
);

ReactDOM.render(<Presentation />, document.getElementById('root'));
