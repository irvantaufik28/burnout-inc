import { useGameStore } from '../store/useGameStore';
import { InterviewModal } from './InterviewModal';
import { ChaosEventModal } from './ChaosEventModal';
import { LevelUpModal } from './LevelUpModal';
import { ClientReviewModal } from './ClientReviewModal';
import { UnexpectedExpenseModal } from './UnexpectedExpenseModal';
import { PaymentModal } from './PaymentModal';

export const ModalManager = () => {
  const eventQueue = useGameStore((state) => state.eventQueue);
  
  if (eventQueue.length === 0) return null;

  const currentEvent = eventQueue[0];

  switch (currentEvent.type) {
    case 'payment':
      return <PaymentModal />;
    case 'chaos':
      return <ChaosEventModal />;
    case 'unexpected_expense':
      return <UnexpectedExpenseModal />;
    case 'interview':
      return <InterviewModal />;
    case 'review':
      return <ClientReviewModal />;
    case 'level_up':
      return <LevelUpModal />;
    default:
      return null;
  }
};
