// In this file you can instantiate your views
// We here first instantiate wrapping views, then the trial views

/** Wrapping views below

* Obligatory properties

    * trials: int - the number of trials this view will appear
    * name: string

*Optional properties
    * buttonText: string - the text on the button (default: 'next')
    * text: string - the text to be displayed in this view
    * title: string - the title of this view

    * More about the properties and functions of the wrapping views - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/01_template_views/#wrapping-views

*/

// Every experiment should start with an intro view. Here you can welcome your participants and tell them what the experiment is about
const intro = magpieViews.view_generator("intro", {
  trials: 1,
  name: "intro",
  // If you use JavaScripts Template String `I am a Template String`, you can use HTML <></> and javascript ${} inside
  text: `Thank you for your participation in our study!
         Your anonymous data makes an important contribution to our understanding of human language use.
          <br />
          <br />
          Legal information:
          By answering the following questions, you are participating in a study
          being performed by scientists from the University of Osnabrueck.
          <br />
          <br />
          You must be at least 18 years old to participate.
          <br />
          <br />
          Your participation in this research is voluntary.
          You may decline to answer any or all of the following questions.
          You may decline further participation, at any time, without adverse consequences.
          <br />
          <br />
          Your anonymity is assured; the researchers who have requested your
          participation will not receive any personal information about you.
          `,
  buttonText: "begin the experiment"
});

// For most tasks, you need instructions views
const instructions = magpieViews.view_generator("instructions", {
  trials: 1,
  name: "instructions",
  title: "General Instructions",
  text: `In this experiment you are shown pictures of different arrangements of blocks.
          <br/>
          <br/>
         For each presented scenario you will be asked to rate the likelihood that certain blocks touch or do not <b>touch the ground</b>.
         A block is considered to touch the ground <b>as soon as a small part or an edge of the block eventually has come in contact
         with the ground</b>.
         The colored blocks all have the same properties, they are only distinguishable by their color.
          <br/>
          <br/>
         For each scenario you are asked to judge four events. You will only be able to proceed to the next scenario after you have rated all four events by moving the sliders. The circles of the sliders will turn green after you have moved them. If you cannot proceed to the next scenario, make sure that the circles of all sliders have turned green.
            <br />
            <br />
        You may wonder whether the probabilities that you assign to the four events must sum up to 1. In this respect, note that we are interested in how you rate the four events relative to each other. Therefore they <b>do not have to sum to 1</b>.
            <br />
            <br />
        There are 25 scenarios in total. The experiment will take you about 15-25 minutes.
        <br />
        <br />
        Before you are presented the main 25 scenarios, you will be shown <b>four training examples</b> to get familiar with the stimuli.
        The training examples are animated. After you have rated all four events by moving the sliders, you will be able to run the animation by clicking on the 'Run'-button. You will only be able to proceed to the next training example after you have rated all four events and clicked the 'Run'-button.`,
  buttonText: "go to example trials"
});

const instructions2 = magpieViews.view_generator("instructions", {
  trials: 1,
  name: "instructions2",
  title: "Instructions",
  text: `We will now move on to the main part of the experiment. Now, you will see static pictures without the possiblity to run an animation. You will be asked to rate how likely certain blocks will touch or not touch the ground.
        <br />
        <br />
        Please keep in mind:
          <br/>
        For a block to touch the ground it is sufficient that a small part or an edge of the block eventually comes in contact with the ground.
          <br/>
        The colored blocks all have the same properties, they are only distinguishable by their color.
          <br/>
        The probabilities that you assign to the four events does not have to sum up to 1.`,
  buttonText: "Start main experiment"
});

// In the post test questionnaire you can ask your participants addtional questions
const post_test = magpieViews.view_generator("post_test", {
  trials: 1,
  name: "post_test",
  title: "Additional information",
  text: "Answering the following questions is optional, but your answers will help us analyze our results."

  // You can change much of what appears here, e.g., to present it in a different language, as follows:
  // buttonText: 'Weiter',
  // age_question: 'Alter',
  // gender_question: 'Geschlecht',
  // gender_male: 'männlich',
  // gender_female: 'weiblich',
  // gender_other: 'divers',
  // edu_question: 'Höchster Bildungsabschluss',
  // edu_graduated_high_school: 'Abitur',
  // edu_graduated_college: 'Hochschulabschluss',
  // edu_higher_degree: 'Universitärer Abschluss',
  // languages_question: 'Muttersprache',
  // languages_more: '(in der Regel die Sprache, die Sie als Kind zu Hause gesprochen haben)',
  // comments_question: 'Weitere Kommentare'
});

// The 'thanks' view is crucial; never delete it; it submits the results!
const thanks = magpieViews.view_generator("thanks", {
  trials: 1,
  name: "thanks",
  title: "Thank you very much for taking part in this experiment!",
  prolificConfirmText: "Press the button"
});

// experimental phase trials
const multiple_slider = magpieViews.view_generator(
  "slider_rating", {
    // This will use all trials specified in `data`, you can user a smaller value (for testing), but not a larger value
    trials: slider_rating_trials.length,
    // trials: 1,
    // name should be identical to the variable name
    name: "slider_main",
    data: _.shuffle(slider_rating_trials)
  },
  // you can add custom functions at different stages through a view's life cycle
  {
    stimulus_container_generator: multi_slider_generator.stimulus_container_gen,
    answer_container_generator: multi_slider_generator.answer_container_gen,
    handle_response_function: multi_slider_generator.handle_response_function
  }
);
