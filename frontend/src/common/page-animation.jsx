import {  AnimatePresence ,motion} from "framer-motion";


const AnimationWrapper=({children,initial={opacity:0},animate={opacity:2} ,transition={duration:1 ,ease:"easeInOut"}})=> {
    return(
        <AnimatePresence>
            <motion.div
            initial={initial}
            animate={animate}
            transition={transition}
            >
                { children }
            </motion.div>
        </AnimatePresence>
    )
}
export default AnimationWrapper;