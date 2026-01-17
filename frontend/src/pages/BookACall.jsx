import React, { useState } from 'react';
import { useForm } from '@formspree/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  Send,
  Sparkles,
  Clock,
  Calendar as CalendarIcon,
} from 'lucide-react';
import PrimaryButton from '../components/common/PrimaryButton';
import { useNavigate } from 'react-router-dom';

const BookACall = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [state, handleSubmit] = useForm(import.meta.env.VITE_FORMSPREE_ID);
  const navigate = useNavigate();

  const totalSteps = 4;

  // --- Calendar Logic ---
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handleDateClick = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (newDate < new Date().setHours(0, 0, 0, 0)) return; // Disable past dates
    setSelectedDate(newDate);
  };

  const changeMonth = (offset) => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + offset)));
  };

  // --- Time Slots ---
  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
    '07:00 PM',
    '08:00 PM',
    '09:00 PM',
  ];

  const nextStep = (e) => {
    e?.preventDefault();
    if (step === 1 && !formData.name) return;
    if (step === 2 && !formData.email) return;
    if (step === 3 && !selectedTime) return;
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const stepVariants = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  const transition = { duration: 0.5, ease: [0.4, 0, 0.2, 1] };

  if (state.succeeded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg p-6 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="text-primary w-12 h-12" />
          </div>
          <h2 className="text-4xl font-bold text-text mb-4">Request Sent!</h2>
          <p className="text-mutedText mb-8 max-w-md">
            Check your email for confirmation. Farhan will confirm the slot for <br />
            <span className="text-primary font-bold">
              {selectedDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}{' '}
              at {selectedTime}
            </span>
            .
          </p>
          <div className="w-fit mx-auto">
            <PrimaryButton
              size="lg"
              onClick={() => navigate('/')}
              text="Back to Home"
              bgColor="bg-primary"
              className="rounded-full"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen bg-bg text-text flex justify-center px-6 md:px-7 lg:px-10 py-30 overflow-hidden">
      <div className="max-w-4xl w-full relative z-10">
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-16 px-2">
          <div className="flex gap-3">
            {[...Array(totalSteps)].map((_, i) => (
              <div
                key={i}
                className={`h-1 transition-all duration-700 rounded-full ${i + 1 <= step ? 'w-10 bg-primary' : 'w-4 bg-white/10'}`}
              />
            ))}
          </div>
          <span className="text-xs font-mono text-mutedText uppercase tracking-widest">
            Step 0{step}
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Hidden inputs for Formspree */}
          <input type="hidden" name="name" value={formData.name} />
          <input type="hidden" name="email" value={formData.email} />
          <input
            type="hidden"
            name="meeting_date"
            value={`${selectedDate.toDateString()} at ${selectedTime}`}
          />

          <AnimatePresence mode="wait">
            {/* Step 1: Name */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transition}
                className="space-y-8"
              >
                <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                  First, what's your <br />
                  <span className="text-primary">full name?</span>
                </h2>
                <input
                  autoFocus
                  required
                  placeholder="Type here..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-white/10 py-5 text-2xl md:text-4xl focus:border-primary outline-none transition-all placeholder:text-white/10 text-text"
                />
                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 text-primary text-lg font-medium group pt-4"
                >
                  Next Step <ChevronRight />
                </button>
              </motion.div>
            )}

            {/* Step 2: Email */}
            {step === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transition}
                className="space-y-8"
              >
                <h2 className="text-4xl md:text-6xl font-bold">
                  And your <span className="text-secondary">email?</span>
                </h2>
                <input
                  autoFocus
                  type="email"
                  required
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-white/10 py-5 text-2xl md:text-4xl focus:border-secondary outline-none transition-all placeholder:text-white/10 text-text"
                />
                <div className="flex gap-8 pt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="text-mutedText flex items-center gap-1 hover:text-text"
                  >
                    <ChevronLeft size={20} /> Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="text-secondary flex items-center gap-2 font-medium"
                  >
                    Next <ChevronRight />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: CUSTOM CALENDAR & TIME */}
            {step === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transition}
                className="space-y-10"
              >
                <h2 className="text-4xl md:text-5xl font-bold">
                  When should we <span className="text-primary">talk?</span>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Custom Calendar Card */}
                  <div className="bg-cardBg p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-lg">
                        {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                      </h3>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => changeMonth(-1)}
                          className="p-2 hover:bg-white/5 rounded-full"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          type="button"
                          onClick={() => changeMonth(1)}
                          className="p-2 hover:bg-white/5 rounded-full"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-mutedText mb-4">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                        <div key={d}>{d}</div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      {[
                        ...Array(
                          firstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth())
                        ),
                      ].map((_, i) => (
                        <div key={i} />
                      ))}
                      {[
                        ...Array(daysInMonth(currentMonth.getFullYear(), currentMonth.getMonth())),
                      ].map((_, i) => {
                        const day = i + 1;
                        const isSelected =
                          selectedDate.getDate() === day &&
                          selectedDate.getMonth() === currentMonth.getMonth();
                        const isPast =
                          new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day) <
                          new Date().setHours(0, 0, 0, 0);

                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => handleDateClick(day)}
                            disabled={isPast}
                            className={`h-10 w-10 flex items-center justify-center rounded-xl text-sm transition-all
                              ${isSelected ? 'bg-primary text-bg font-bold scale-110' : 'hover:bg-white/10'}
                              ${isPast ? 'opacity-20 cursor-not-allowed' : ''}`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Custom Time Grid */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-mutedText font-mono text-xs uppercase tracking-widest">
                      <Clock size={16} /> Selected: {selectedDate.toLocaleDateString()}
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`py-4 rounded-2xl border text-xs font-bold transition-all
                            ${selectedTime === time ? 'bg-primary border-primary text-bg' : 'bg-white/5 border-white/5 text-mutedText hover:border-white/20'}`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-8 pt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="text-mutedText flex items-center gap-1 hover:text-text"
                  >
                    <ChevronLeft size={20} /> Back
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={!selectedTime}
                    className={`text-lg font-medium flex items-center gap-2 ${selectedTime ? 'text-primary' : 'text-zinc-700'}`}
                  >
                    Almost done <ChevronRight />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Message */}
            {step === 4 && (
              <motion.div
                key="step4"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transition}
                className="space-y-8"
              >
                <h2 className="text-4xl md:text-6xl font-bold leading-tight text-primary">
                  Describe.
                </h2>
                <textarea
                  autoFocus
                  name="message"
                  required
                  placeholder="Tell me about your vision..."
                  rows="4"
                  className="w-full bg-cardBg border border-white/10 p-8 rounded-[2.5rem] outline-none focus:border-primary transition-all text-xl text-text shadow-2xl resize-none"
                />
                <div className="flex flex-col md:flex-row gap-6 pt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="text-mutedText flex items-center justify-center gap-2 order-2 md:order-1 px-4 hover:text-text"
                  >
                    <ChevronLeft /> Back
                  </button>
                  <PrimaryButton
                    type="submit"
                    text={state.submitting ? 'Sending Request...' : 'Secure My Spot'}
                    icon={Send}
                    size="xl"
                    disabled={state.submitting}
                    className="flex-1 rounded-full py-5 order-1 md:order-2 shadow-2xl shadow-primary/20"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </section>
  );
};

export default BookACall;
