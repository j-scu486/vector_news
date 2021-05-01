import Lottie from 'react-lottie';
import * as animationData from '../stylesheets/vendors/6970-like.json'
import { useState } from 'react'

export default function LikeButton() {
    const [stopped, setStopped] = useState(true)
    const [paused, setPaused] = useState(true)
    const [direction, setDirection] = useState(1)

    const defaultOptions = {
        loop: false,
        autoplay: false,
        animationData: animationData.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

      const toggleAnimation = () => {
        direction ? setDirection(-1) : setDirection(1)
      }

      const lottieStyle = {
          cursor: 'pointer'
      }

      const eventListeners=[
        {
          eventName: 'complete',
          callback: (e) => toggleAnimation(),
        },
      ]

    return (
        <div 
          style={lottieStyle}
          // onClick={toggleAnimation}
          >                
            <Lottie options={defaultOptions}
                    height={100}
                    width={100}
                    speed={direction}
                    isStopped={stopped}
                    // eventListeners={eventListeners}
                    isPaused={paused}/>
        </div>
    )
}
