import requests
import random

post_title = [
    "Cillum dolor elit minim consectetur.",
    "Labore pariatur.",
    "Labore minim laboris quis ex.",
    "Id do ut labore.",
    "Ex deserunt adipisicing.",
    "Irure voluptate est.",
    "Esse dolor est ad velit labore.",
    "Id sunt nostrud magna.",
    "Proident et nostrud.",
    "Laboris ad exercitation duis.",
]

post_content = [
    "Mollit occaecat consectetur anim voluptate. Aute laboris consequat officia irure. Deserunt id labore mollit. Officia in. Enim nisi do aliquip.",
    "Qui commodo pariatur nulla. Quis anim consectetur fugiat. Ea anim non. Ea in occaecat pariatur duis ut.",
    "Ad non magna ullamco ut. Adipisicing anim laboris. Magna reprehenderit esse laborum nulla. Nisi occaecat voluptate laboris sint. Voluptate tempor ut ut consequat non.",
    "Dolore amet velit cillum aute fugiat. Velit esse fugiat. Dolor esse nisi mollit reprehenderit. Et culpa proident proident. Veniam qui cupidatat reprehenderit.",
    "Deserunt eu labore. Occaecat fugiat. Qui do. In eiusmod quis id sint exercitation. Dolore tempor.",
    "Ipsum occaecat aliqua tempor mollit. Reprehenderit in ex adipisicing ut elit. Eiusmod nisi fugiat.",
    "Fugiat sint. Sint do qui proident occaecat sit. Aliquip magna nostrud aliquip. Laborum pariatur est voluptate ad.",
]

post_tags = [
    "Java",
    "Python",
    "C#",
    ".NET",
    "Web",
    "SpringBoot",
    "Node.js",
    "Rust",
    "Golang",
    "AI",
    "DeepSeek",
    "Gemini",
    "ChatGPT",
    "Unity",
    "Vue3",
]


def generate_post_data(key):
    return {
        "title": random.choice(post_title),
        "imageUrl": f"https://picsum.photos/400/300?random={key}",
        "content": random.choice(post_content),
        "heat": str(random.randint(100, 5000)),
        "comments": str(random.randint(100, 5000)),
        "likes": str(random.randint(100, 5000)),
        "tags": get_random_combination(post_tags),
    }


def get_random_combination(tags):
    k = random.randint(1, 3)
    return random.sample(tags, k)


def main():
    url = "http://localhost:3000/api/create"

    for i in range(20):
        try:
            response = requests.post(url, json=generate_post_data(i))
            print(f"第{i+1}次请求 - 状态码: {response.status_code}")
        except Exception as e:
            print(f"第{i+1}次请求失败: {str(e)}")


if __name__ == "__main__":
    main()
