
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  MessagesSquare,
  Video
} from "lucide-react";

interface HistoryItem {
  id: string;
  type: 'message' | 'call' | 'meeting';
  title: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantRole: string;
  date: string;
  duration?: number;
  notes?: string;
}

interface ConnectionHistoryProps {
  history: HistoryItem[];
}

export default function ConnectionHistory({ history }: ConnectionHistoryProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newExpandedItems = new Set(expandedItems);
    if (expandedItems.has(id)) {
      newExpandedItems.delete(id);
    } else {
      newExpandedItems.add(id);
    }
    setExpandedItems(newExpandedItems);
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 
      ? `${hours}h ${remainingMinutes}m` 
      : `${hours}h`;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessagesSquare className="h-4 w-4 text-teal-500" />;
      case 'call':
        return <Video className="h-4 w-4 text-blue-500" />;
      case 'meeting':
        return <Calendar className="h-4 w-4 text-purple-500" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-medium text-teal-900">Recent Connections</h3>
      </div>
      
      <div className="divide-y divide-gray-100">
        {history.map((item) => (
          <div key={item.id} className="group">
            <div 
              className="p-4 hover:bg-teal-50 cursor-pointer flex items-start justify-between"
              onClick={() => toggleItem(item.id)}
            >
              <div className="flex items-start">
                <div className="mr-3">
                  <img 
                    src={item.participantAvatar} 
                    alt={item.participantName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{item.participantName}</span>
                    <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700">
                      {item.participantRole}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    {getTypeIcon(item.type)}
                    <span className="ml-1 mr-2">{item.title}</span>
                    <span className="text-xs">
                      {formatDistanceToNow(new Date(item.date), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                {expandedItems.has(item.id) ? (
                  <ChevronUp className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                )}
              </div>
            </div>
            
            {expandedItems.has(item.id) && (
              <div className="px-4 pb-4 pt-0 bg-teal-50/50">
                <div className="pl-13 ml-13">
                  <div className="bg-white p-3 rounded-md border border-gray-200 ml-13">
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="text-gray-500">Date</span>
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    
                    {item.duration && (
                      <div className="flex justify-between mb-2 text-sm">
                        <span className="text-gray-500">Duration</span>
                        <span>{formatDuration(item.duration)}</span>
                      </div>
                    )}
                    
                    {item.notes && (
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <div className="text-xs text-gray-500 mb-1">Notes</div>
                        <p className="text-sm">{item.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
