// Import delle GIF
import jumpingJacksGif from '../assets/gifs/jumping_jacks.gif';
import mountainClimbersGif from '../assets/gifs/mountain_climbers.gif';
import burpeesGif from '../assets/gifs/burpees.gif';
import squatGif from '../assets/gifs/squat_a_corpo_libero.gif';
import affondiGif from '../assets/gifs/affondi_alternati.gif';
import pushUpGif from '../assets/gifs/push_up_classico.gif';
import plankGif from '../assets/gifs/plank_isometrico.gif';
import sitUpGif from '../assets/gifs/sit_up.gif';
import highKneesGif from '../assets/gifs/high_knees.gif';

import sumoSquatGif from '../assets/gifs/sumo_squat.gif';
import piegamentiStrettiGif from '../assets/gifs/piegamenti_sulle_braccia_stretti.gif';
import supermanHoldGif from '../assets/gifs/superman_hold.gif';
import vUpsGif from '../assets/gifs/v_ups.gif';
import sidePlankGif from '../assets/gifs/side_plank.gif';
import wallSitGif from '../assets/gifs/wall_sit.gif';

import sprintGif from '../assets/gifs/sprint_sul_posto.gif';
import jumpSquatGif from '../assets/gifs/jump_squat.gif';
import boxJumpsGif from '../assets/gifs/in_and_out_jumps.gif';

import kettlebellSwingGif from '../assets/gifs/kettlebell_swing.gif';
import dumbbellThrusterGif from '../assets/gifs/dumbbell_thruster.gif';
import russianTwistGif from '../assets/gifs/russian_twist_con_peso.gif';
import pushPressGif from '../assets/gifs/push_press_con_manubri.gif';
import bentOverRowGif from '../assets/gifs/bent_over_row_con_manubri.gif';

import birdDogGif from '../assets/gifs/bird_dog.gif';
import gluteBridgeGif from '../assets/gifs/glute_bridge.gif';
import lungesRotazioneGif from '../assets/gifs/lunges_con_rotazione.gif';

const exerciseOptions = [
  // 🧍 Corpo libero – Base
  { name: 'Jumping Jacks', gif: jumpingJacksGif },
  { name: 'Mountain Climbers', gif: mountainClimbersGif },
  { name: 'Burpees', gif: burpeesGif },
  { name: 'Squat a corpo libero', gif: squatGif },
  { name: 'Affondi alternati', gif: affondiGif },
  { name: 'Push-up classico', gif: pushUpGif },
  { name: 'Plank isometrico', gif: plankGif },
  { name: 'Sit-up', gif: sitUpGif },
  { name: 'High Knees', gif: highKneesGif },

  // 💪 Forza funzionale
  { name: 'Sumo Squat', gif: sumoSquatGif },
  { name: 'Piegamenti sulle braccia stretti', gif: piegamentiStrettiGif },
  { name: 'Superman Hold', gif: supermanHoldGif },
  { name: 'V-Ups', gif: vUpsGif },
  { name: 'Side Plank', gif: sidePlankGif },
  { name: 'Wall Sit', gif: wallSitGif },

  // 🏃‍♀️ Cardio dinamico
  { name: 'Sprint sul posto', gif: sprintGif },
  { name: 'Jump Squat', gif: jumpSquatGif },
  { name: 'Box Jumps', gif: boxJumpsGif },

  // 🏋️‍♀️ Con attrezzi (facoltativi)
  { name: 'Kettlebell Swing', gif: kettlebellSwingGif },
  { name: 'Dumbbell Thruster', gif: dumbbellThrusterGif },
  { name: 'Russian Twist con peso', gif: russianTwistGif },
  { name: 'Push Press con manubri', gif: pushPressGif },
  { name: 'Bent-over Row con manubri', gif: bentOverRowGif },

  // 🧘 Mobilità e core
  { name: 'Bird Dog', gif: birdDogGif },
  { name: 'Glute Bridge', gif: gluteBridgeGif },
  { name: 'Lunges con rotazione', gif: lungesRotazioneGif },
];

export default exerciseOptions;
