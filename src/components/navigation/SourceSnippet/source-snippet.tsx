import Text from "@/components/ui/Text";
import * as sty from "./source-snippet.css";
import { Icon } from '@/components/ui/Icon';

export function SourceSnippet() {
  return (
    <div className={sty.wrap}>
      <Text as="a" variant="micro" href="https://github.com/tannerorourke/vault">
        Made with <Icon name="heart" size="sm" className={sty.heart} /> by me
      </Text>
    </div>
    
  )

}