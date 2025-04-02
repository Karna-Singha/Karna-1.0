
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface SubjectAssessmentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const subjects = [
  "Physics",
  "Mathematics",
  "Zoology",
  "Botany",
  "Physical Chemistry",
  "Inorganic Chemistry",
  "Organic Chemistry"
];

const SubjectAssessment: React.FC<SubjectAssessmentProps> = ({ open, onOpenChange }) => {
  const [selectedSubjects, setSelectedSubjects] = useState<Record<string, boolean>>(
    subjects.reduce((acc, subject) => ({
      ...acc,
      [subject]: false
    }), {})
  );
  
  const [keepPrevious, setKeepPrevious] = useState<boolean>(false);
  
  const handleSubmit = () => {
    const weakSubjects = Object.entries(selectedSubjects)
      .filter(([_, isSelected]) => isSelected)
      .map(([subject]) => subject);
    
    console.log('Weak subjects for this month:', weakSubjects);
    console.log('Keep previous selections:', keepPrevious);
    
    // In a real app, we would save this to user's profile
    onOpenChange(false);
  };
  
  const toggleSubject = (subject: string) => {
    setSelectedSubjects(prev => ({
      ...prev,
      [subject]: !prev[subject]
    }));
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Monthly Subject Assessment</DialogTitle>
          <DialogDescription>
            Select the subjects you want to focus on improving this month. 
            This will help KARNA's algorithm prioritize your tasks.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-4 py-4">
          {subjects.map((subject) => (
            <div key={subject} className="flex items-center space-x-2">
              <Checkbox 
                id={subject}
                checked={selectedSubjects[subject]}
                onCheckedChange={() => toggleSubject(subject)}
              />
              <Label htmlFor={subject} className="font-medium">{subject}</Label>
            </div>
          ))}
          
          <div className="mt-4 border-t border-border pt-4 flex items-center space-x-2">
            <Checkbox 
              id="keepPrevious"
              checked={keepPrevious}
              onCheckedChange={() => setKeepPrevious(!keepPrevious)}
            />
            <Label htmlFor="keepPrevious" className="text-muted-foreground">
              Keep my selections from last month
            </Label>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={handleSubmit}>Save Preferences</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubjectAssessment;
