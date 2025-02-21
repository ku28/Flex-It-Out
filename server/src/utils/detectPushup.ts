// utils/detectPushup.ts
interface PoseLandmark {
    x: number;
    y: number;
    z: number;
    visibility?: number;
}

interface PushUpState {
    isDown: boolean;
    lastAngle: number;
    repCount: number;
    timestamp: number;
}

// Calculate angle between three points
const calculateAngle = (
    a: PoseLandmark,
    b: PoseLandmark,
    c: PoseLandmark
): number => {
    const radians =
        Math.atan2(c.y - b.y, c.x - b.x) -
        Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180) / Math.PI);

    // Ensure angle is between 0 and 180 degrees
    if (angle > 180) {
        angle = 360 - angle;
    }

    return angle;
};

// Check if body is aligned properly
const isBodyAligned = (landmarks: PoseLandmark[]): boolean => {
    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    const leftHip = landmarks[23];
    const rightHip = landmarks[24];
    const leftAnkle = landmarks[27];
    const rightAnkle = landmarks[28];

    // Calculate body alignment angle
    const shoulderAngle = Math.abs(leftShoulder.y - rightShoulder.y);
    const hipAngle = Math.abs(leftHip.y - rightHip.y);
    const ankleAngle = Math.abs(leftAnkle.y - rightAnkle.y);

    // Body should be relatively straight (threshold of 0.1)
    return shoulderAngle < 0.1 && hipAngle < 0.1 && ankleAngle < 0.1;
};

// Initialize push-up state
let pushUpState: PushUpState = {
    isDown: false,
    lastAngle: 180,
    repCount: 0,
    timestamp: Date.now(),
};

// Constants for push-up detection
const PUSHUP_DOWN_ANGLE = 90; // Angle when in down position
const PUSHUP_UP_ANGLE = 160; // Angle when in up position
const MIN_REP_TIME = 500; // Minimum time for one rep (ms)
const VISIBILITY_THRESHOLD = 0.5; // Minimum visibility threshold for landmarks

export const detectPushUp = (landmarks: PoseLandmark[]): boolean => {
    if (!landmarks || landmarks.length < 33) return false;

    // Get key landmarks
    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    const leftElbow = landmarks[13];
    const rightElbow = landmarks[14];
    const leftWrist = landmarks[15];
    const rightWrist = landmarks[16];

    // console.log('landmarks:', leftShoulder, rightShoulder, leftElbow, rightElbow, leftWrist, rightWrist);
    const keyPoints = [
        leftShoulder,
        rightShoulder,
        leftElbow,
        rightElbow,
        leftWrist,
        rightWrist,
    ];
    if (
        keyPoints.some(
            (point) =>
                point.visibility &&
                point.visibility < VISIBILITY_THRESHOLD
        )
    ) {
        return false;
    }

    // Calculate angles for both arms
    const leftArmAngle = calculateAngle(
        leftShoulder,
        leftElbow,
        leftWrist
    );
    const rightArmAngle = calculateAngle(
        rightShoulder,
        rightElbow,
        rightWrist
    );

    // Use average of both arms for more accurate detection
    const currentAngle = (leftArmAngle + rightArmAngle) / 2;

    // Check if body is in proper push-up position
    if (!isBodyAligned(landmarks)) {
        return false;
    }

    const currentTime = Date.now();
    const timeSinceLastRep = currentTime - pushUpState.timestamp;

    // Detect push-up phases
    if (!pushUpState.isDown) {
        // Detect down phase
        if (
            currentAngle < PUSHUP_DOWN_ANGLE &&
            pushUpState.lastAngle >= PUSHUP_DOWN_ANGLE
        ) {
            pushUpState.isDown = true;
            pushUpState.lastAngle = currentAngle;
        }
    } else {
        // Detect up phase
        if (
            currentAngle > PUSHUP_UP_ANGLE &&
            pushUpState.lastAngle <= PUSHUP_UP_ANGLE
        ) {
            // Ensure minimum time between reps to prevent false positives
            if (timeSinceLastRep >= MIN_REP_TIME) {
                pushUpState.isDown = false;
                pushUpState.timestamp = currentTime;
                pushUpState.repCount++;
                pushUpState.lastAngle = currentAngle;
                return true; // Complete push-up detected
            }
        }
    }

    pushUpState.lastAngle = currentAngle;
    return false;
};

// Reset push-up state (useful when starting a new session)
export const resetPushUpState = () => {
    pushUpState = {
        isDown: false,
        lastAngle: 180,
        repCount: 0,
        timestamp: Date.now(),
    };
};

// Get current push-up count
export const getPushUpCount = () => pushUpState.repCount;
