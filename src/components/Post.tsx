
import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { USER_ROLE_LABELS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Heart,
  Share2,
  MoreHorizontal,
  Send,
  Paperclip,
  Image,
  File
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface Author {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface PostData {
  id: string;
  author: Author;
  title: string;
  content: string;
  likes: number;
  comments: number;
  createdAt: string;
  tags?: string[];
  media?: {
    type: 'image' | 'file';
    url: string;
    name?: string;
  }[];
}

interface PostProps {
  id: string;
  author: Author;
  title: string;
  content: string;
  likes: number;
  comments: number;
  createdAt: string;
  tags?: string[];
  media?: {
    type: 'image' | 'file';
    url: string;
    name?: string;
  }[];
}

// Accept either individual props or a post object
export default function Post(props: PostProps | { post: PostData }) {
  // Handle both ways of passing props
  const postData = 'post' in props ? props.post : props;
  
  const {
    id,
    author,
    title,
    content,
    likes: initialLikes,
    comments: commentCount,
    createdAt,
    tags,
    media
  } = postData;
  
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleComment = () => {
    setIsCommenting(!isCommenting);
  };

  const handleShare = () => {
    toast({
      title: "Success",
      description: "Post link copied to clipboard"
    });
  };

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      toast({
        title: "Success",
        description: "Comment posted successfully"
      });
      setCommentText("");
      setIsCommenting(false);
    }
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-white hover:shadow-sm transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <Link to={`/profiles/${author.id}`} className="flex items-center space-x-3">
            <img
              src={author.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop"}
              alt={author.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium text-sm">{author.name}</h3>
              <div className="flex items-center space-x-2 mt-0.5">
                <Badge variant="secondary" className="text-xs">
                  {USER_ROLE_LABELS[author.role as keyof typeof USER_ROLE_LABELS]}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Save post</DropdownMenuItem>
              <DropdownMenuItem>Report</DropdownMenuItem>
              <DropdownMenuItem>Not interested</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Link to={`/community/post/${id}`}>
          <h4 className="text-lg font-display font-medium mb-2 hover:text-teal-600 transition-colors">
            {title}
          </h4>
          <p className="text-muted-foreground mb-4">{content}</p>
        </Link>

        {/* Display media attachments if available */}
        {media && media.length > 0 && (
          <div className="mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {media.map((item, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden">
                  {item.type === 'image' ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
                      <img
                        src={item.url}
                        alt={item.name || "Attached image"}
                        className="w-full h-auto object-cover rounded-lg"
                      />
                    </a>
                  ) : (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <File className="h-5 w-5 text-teal-600 mr-2" />
                      <span className="text-sm truncate">{item.name || "Attached file"}</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="bg-teal-50 text-teal-700 hover:bg-teal-100">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 ${
                isLiked ? "text-red-500" : ""
              } hover:text-foreground transition-colors`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500" : ""}`} />
              <span>{likes}</span>
            </button>
            <button
              onClick={handleComment}
              className="flex items-center space-x-1 hover:text-foreground transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              <span>{commentCount}</span>
            </button>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center space-x-1 hover:text-foreground transition-colors"
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
        </div>

        {isCommenting && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Textarea
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="min-h-[80px] mb-2"
            />
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                className="mr-2"
                onClick={() => setIsCommenting(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSubmitComment}
                disabled={!commentText.trim()}
                className="bg-teal-600 hover:bg-teal-700"
              >
                <Send className="h-4 w-4 mr-2" />
                Post
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
